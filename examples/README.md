## Creating a plugin

Start by creating a new plugin file in `src/plugins`
```bash
touch src/plugins/poll.js
```

Our poll plugin will perform the following actions:
* A user can create a new poll
* A user can 
* A user can obtain help describing the available functions
* A

Our plugin will define an empty constructor and a handle message function that dispatches messages
from Discord. A plugin returns `true` if it handled the message.
```js
class PollPlugin {
  constructor() {
  }

  handle_message(message) {
    console.log('stub poll handle_message')
  }
}
```

TODO: Finish README and implementation of poll.js

Start by implementing the `create` and `create_help` functions, and changing up `handle_message`
```js
handle_message(message) {
  if (message.content.startsWith('poll create help')) {
    this.create_help(message);
    return(true);
  } else if (message.content.startsWith('poll create')) {
    this.create(message);
    return(true);
  }
  return(false);
}

create(message) {
  this.current_id += 1;
  let title = message.content.replace('todo create ', '');

  // Removes new lines and carriage returns
  let safe_title = title.replace(/\n|\r/g,'');
  this.polls.push({
    id: this.current_id,
    title: safe_title,
    options: {}
  });

  let response = "Successfully created your poll: " + safe_title + "\n" +
                 "Access your poll with id: " + String(this.current_id);

  message.reply(response);
}

create_help(message) {
  let response = "poll create Title of Your Poll";
  message.reply(response);
}
```

With this, the bot knows how to respond to the `poll create` and `poll create help` methods.

The rest of the poll plugin can be viewed 

