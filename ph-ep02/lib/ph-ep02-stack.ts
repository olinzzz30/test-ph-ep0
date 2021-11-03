import * as cdk from '@aws-cdk/core';
import * as autoscaling from '@aws-cdk/aws-autoscaling';
import * as ec2 from '@aws-cdk/aws-ec2';


export class PhEp02Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'VPC', { isDefault: true });

    const asg = new autoscaling.AutoScalingGroup(this, 'ASG', {
      vpc,
      machineImage: new ec2.AmazonLinuxImage(),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      maxCapacity: 10,
      minCapacity: 6,
      desiredCapacity: 8,
      // mixedInstancesPolicy: {
      //   instanceDistribution: {
      //     onDemandBaseCapacity: 1,
      //     onDemandPercentageAboveBaseCapacity: 50,
      //     spotAllocationStrategy: autoscaling.SpotAllocationStrategy.LOWESTPRICE,
      //     spotInstancePools: 10,
      //   },
      //   overrideInstanceTypes: [
      //     ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MEDIUM),
      //     ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.LARGE),
      //     ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.SMALL),
      //   ]
      
    })

    // The code that defines your stack goes here
  }
}
