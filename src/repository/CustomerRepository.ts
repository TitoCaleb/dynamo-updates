import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { config } from "../config";
import { notFound } from "@hapi/boom";

const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export const getCustomer = async (customerId: string) => {
  const { Item } = await dynamoDbClient.send(
    new GetCommand({
      TableName: `CustomersDb${config.env}`,
      Key: { id: customerId },
    })
  );

  if (!Item) {
    throw notFound("Customer not found");
  }

  return Item;
};

export const getAllCustomersWithClientId = async (params: {
  limit?: number;
  lastEvaluatedKey?: Record<string, any>;
  clientId: string;
}) => {
  let lastEvaluatedKey: Record<string, any> | undefined =
    params.lastEvaluatedKey;

  const { Items, LastEvaluatedKey } = await dynamoDbClient.send(
    new QueryCommand({
      TableName: `ClientsCustomersDb${config.env}`,
      Limit: params.limit || 700,
      ExclusiveStartKey: lastEvaluatedKey,
      KeyConditionExpression: "#clientId = :clientId",
      ExpressionAttributeNames: {
        "#clientId": "clientId",
      },
      ExpressionAttributeValues: {
        ":clientId": params.clientId,
      },
    })
  );

  if (!Items || Items.length === 0) {
    console.log("No customers found in the table");
    return { items: [], lastEvaluatedKey: undefined };
  }

  return { items: Items, lastEvaluatedKey: LastEvaluatedKey };
};
