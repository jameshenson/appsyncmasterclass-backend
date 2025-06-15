const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const Chance = require("chance");
const chance = new Chance();

const USERS_TABLE = process.env.USERS_TABLE;
//this should work
exports.handler = async (event) => {
  if (event.triggerSource === "PostConfirmation_ConfirmSignUp") {
    const name = event.request.userAttributes["name"];
    const suffix = chance.string({ length: 8, casing: "upper", alpha: true, numeric: true });
    const screenName = `${name.replace(/[^a-zA-Z0-9]/g, "")}${suffix}`;
 
    const user = {
      id: { S: event.userName },
      name: { S: name },
      screenName: { S: screenName },
      createdAt: { S: new Date().toJSON() },
      followersCount: { N: "0" },
      followingCount: { N: "0" },
      tweetsCount: { N: "0" },
      likesCounts: { N: "0" },
    };

    const client = new DynamoDBClient();
    const command = new PutItemCommand({
      TableName: USERS_TABLE,
      Item: user,
      ConditionExpression: "attribute_not_exists(id)",
    });

    await client.send(command);
  }

  return event;
};
