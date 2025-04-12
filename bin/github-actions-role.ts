#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { GithubActionsRoleStack } from "../lib/github-actions-role-stack";

const app = new cdk.App();

new GithubActionsRoleStack(app, "GithubActionsRoleStack", {
  env: { account: "", region: "" },
});
