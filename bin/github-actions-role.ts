#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { GithubActionsRoleStack } from "../lib/github-actions-role-stack";

const app = new cdk.App();


// Deploy Stack to your AWS Account.
/**
 * Issue the following Commands to deploy to your environment.
 * 1. CDK-Diff: npm run cdk -- diff GithubActionsRoleStack 
 * 2. After verifying the CDK-Diff, Proceed to the next step.
 * 3. CDK-Deploy: npm run cdk -- deploy GithubActionsRoleStack 
 */
new GithubActionsRoleStack(app, "GithubActionsRoleStack", {
  env: { account: "<YOUR-ACCOUNT-NUMBER>", region: "<YOUR-REGION>" },
});
