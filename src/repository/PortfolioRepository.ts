import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { config } from "../config";
import { notFound } from "@hapi/boom";

const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export const getPortfolio = async (customerId: string) => {
  const { Items } = await dynamoDbClient.send(
    new QueryCommand({
      TableName: `PortfolioDb${config.env}`,
      KeyConditionExpression: "#customerId = :customerId",
      FilterExpression: ["#status <> :status", "#type = :type"].join(" AND "),
      ExpressionAttributeNames: {
        "#customerId": "customerId",
        "#type": "type",
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":customerId": customerId,
        ":type": "CUSTOMER_PORTFOLIO",
        ":status": "DELETED",
      },
    })
  );

  if (!Items?.length) {
    throw notFound("Portfolio not found");
  }

  return Items[0];
};

export const updatePortfolio = async ({
  clientId,
  customerId,
  portfolioId,
}: {
  portfolioId: string;
  customerId: string;
  clientId: string;
}): Promise<void> => {
  await dynamoDbClient.send(
    new UpdateCommand({
      TableName: `PortfolioDb${config.env}`,
      Key: {
        id: portfolioId,
        customerId: customerId,
      },
      UpdateExpression: "SET #clientId = :clientId",
      ExpressionAttributeNames: {
        "#clientId": "clientId",
      },
      ExpressionAttributeValues: {
        ":clientId": clientId,
      },
    })
  );
};
