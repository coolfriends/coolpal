const AWS = require('aws-sdk');

AWS.config.update({region:'us-west-2'});

let dynamodb = new AWS.DynamoDB();

let params = {
  TableName: "discord_todo_item"
};

dynamodb.deleteTable(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});
