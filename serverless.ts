import type { AWS } from "@serverless/typescript";

import hello from "@functions/addData";
import getByIdData from "@functions/getById";
import updateData from "@functions/updateById";
import deleteById from "@functions/deleteById";
import getAll from "@functions/getAll";

const serverlessConfiguration: AWS = {
  service: "myfinaltask",
  frameworkVersion: "2",
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        migrate: true,
        seed: true,
      },
    },
    esbuild: {
      bundle: true,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
    },
  },
  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
  },

  resources: {
    Resources: {
      NaveedResource: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "NaveedTable",
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
        },
      },
    },
  },

  // import the function via paths
  functions: { hello, getByIdData, updateData, deleteById, getAll },
};

module.exports = serverlessConfiguration;
