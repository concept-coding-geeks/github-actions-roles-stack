import { Construct } from "constructs";
import { Stack, StackProps, aws_iam as iam } from "aws-cdk-lib";

export class GithubActionsRoleStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const identityProvider = new iam.OpenIdConnectProvider(
      this,
      "identityProvider",
      {
        url: "https://token.actions.githubusercontent.com",
        clientIds: ["sts.amazonaws.com"],
        thumbprints: ["6938fd4d98bab03faadb97b34396831e3780aea1"], // Adding Thumbprints: https://github.blog/changelog/2022-01-13-github-actions-update-on-oidc-based-deployments-to-aws/
      }
    );

    // IAM Role assumed by Github Actions
    const githubRole = new iam.Role(this, "githubActionsRole", {
      roleName: "github-actions-iam-role",
      description: "IAM Role for Github Actions to assume",
      assumedBy: new iam.OpenIdConnectPrincipal(
        identityProvider
      ).withConditions({
        StringLike: {
          "token.actions.githubusercontent.com:sub": [
            "repo:concept-coding-geeks/*:*",
          ],
        },
        StringEquals: {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        },
      }),
    });
  }
}
