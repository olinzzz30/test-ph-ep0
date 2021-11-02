import * as cdk from '@aws-cdk/core';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs'

export class PhEp07Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const DN = 'ph-ep07.xyzteam.net'
    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', { isDefault: true });

    const cert = new acm.Certificate(this, 'Cert', {
      domainName: 'xyzteam.net',
      // subjectAlternativeNames: ['olintest.xyzteam.net'],
      subjectAlternativeNames: ['*.xyzteam.net'],
      // validationMethod: acm.ValidationMethod.DNS,
      validation: acm.CertificateValidation.fromDns(),
    })

    const tg = new elbv2.ApplicationTargetGroup(this, 'TG', { vpc, port: 80 } );
    const listener = new elbv2.ApplicationListener(this, 'Listener', {
      loadBalancer: new elbv2.ApplicationLoadBalancer(this, 'ALB', { vpc, internetFacing: true }),
      certificateArns: [ cert.certificateArn ],
      protocol: elbv2.ApplicationProtocol.HTTPS,
      defaultTargetGroups: [ tg ],
    })

    const cluster = new ecs.Cluster(this, 'Cluster', { vpc });
    const taskDefinition = new ecs.TaskDefinition(this, 'Task', {
      compatibility: ecs.Compatibility.FARGATE,
      cpu: '256',
      memoryMiB: '512',
    })

    taskDefinition.addContainer('PHP',{
      image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample')
    }).addPortMappings({
      containerPort: 80
    })
    const svc = new ecs.FargateService(this, 'SVC', {
      cluster, 
      taskDefinition,
    })
    tg.addTarget(svc)

    new cdk.CfnOutput(this, 'Cmd', {
      value: `please CNAME ${DN} to ${listener.loadBalancer.loadBalancerDnsName}` 
    })

    new cdk.CfnOutput(this, 'URL', {
      value: `https://${DN}`
    })

// deploy failed 
// [·······] (12/14)
// 4:21:53 PM | CREATE_IN_PROGRESS   | AWS::CloudFormation::Stack                | PhEp07Stack
// 4:25:20 PM | CREATE_IN_PROGRESS   | AWS::ECS::Service                         | SVC/Service
  }
}
