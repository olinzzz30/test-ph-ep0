import * as cdk from '@aws-cdk/core';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as ec2 from '@aws-cdk/aws-ec2';

export class PhEp07Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', { isDefault: true });

    const cert = new acm.Certificate(this, 'Cert', {
      domainName: 'xyzteam.net',
      // subjectAlternativeNames: ['olintest.xyzteam.net'],
      subjectAlternativeNames: ['*.xyzteam.net'],
      // validationMethod: acm.ValidationMethod.DNS,
      validation: acm.CertificateValidation.fromDns(),
    })

    // const tg = new elbv2.ApplicationTargetGroup(this, 'TG', { vpc, port: 80 } );
    // const listener = new elbv2.ApplicationListener(this, 'Listener', {
    //   loadBalancer: new elbv2.ApplicationLoadBalancer(this, 'ALB', { vpc, internetFacing: true }),
    //   certificateArns: [ cert.certificateArn ],
    //   protocol: elbv2.ApplicationProtocol.HTTPS,
    //   defaultTargetGroups: [ tg ],
    // })

    // The code that defines your stack goes here
  }
}
