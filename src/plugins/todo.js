const AWS = require('aws-sdk');

const default_config = {
  aws_region: 'us-west-2'
};

class TodoPlugin {
  constructor(config=default_config) {
    this.supported_event_types = ['message'];
    this.db = new AWS.DynamoDB({region: config.aws_region});
  }

  handle_message(message) {
    if (message.content.includes('todo create')) {
      this.create(message);
      return(true);
    } else if (message.content === 'todo list') {
      this.list(message);
      return(true);
    } else if (message.content.includes('todo delete')) {
      this.delete(message);
      return(true);
    } else {
      console.log('message not intended for todo');
      return(false);
    }
  }

  create(message) {
    let params = {
      Item: {
        "author": {
          S: message.author.username
        },
        "timestamp": {
          S: message.createdTimestamp.toString()
        },
        "content": {
          S: message.content.replace('todo create ', '')
        }
      },
      ReturnConsumedCapacity: "TOTAL", TableName: "discord_todo_item"
    };

    this.db.putItem(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  };

  list(message) {
    let params = {
      ExpressionAttributeValues: {
        ":author": {
          S: message.author.username
        }
      },
      KeyConditionExpression: "author = :author",
      TableName: "discord_todo_item"
    };

    this.db.query(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        let response = "\n**" + message.author.username + "'s TODO List:**\n";

        for (let item of data.Items) {
          response += "**> **" + item.content.S + "\n";
        }
        message.reply(response);
      }
    });
  }

  delete(message) {
    let params = {
      Key: {
        "author": {
          S: message.author.username
        },
        "content": {
          S: message.content.replace('todo delete ', '')
        }
      },
      TableName: "discord_todo_item"
    };
    console.log(params);

    this.db.deleteItem(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  }
};

module.exports = TodoPlugin;
