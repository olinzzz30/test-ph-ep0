import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as PhEp07 from '../lib/ph-ep07-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new PhEp07.PhEp07Stack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT));
});
