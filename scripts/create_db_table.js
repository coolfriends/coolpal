const AWS = require('aws-sdk');

AWS.config.update({region:'us-west-2'});

let dynamodb = new AWS.DynamoDB();

let params = {
  AttributeDefinitions: [
    {
      AttributeName: "author",
      AttributeType: "S"
    },
    {
      AttributeName: "content",
      AttributeType: "S"
    }
  ],
  KeySchema: [
    {
      AttributeName: "author",
      KeyType: "HASH"
    },
    {
      AttributeName: "content",
      KeyType: "RANGE"
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 1
  },
  TableName: "discord_todo_item"
};

dynamodb.createTable(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});
