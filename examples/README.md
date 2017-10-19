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
    if (message.content.startsWith('poll create')) {
      this.create(message);
      return(true);
    } else if (message.content.startsWith('poll create help')) {
      this.create_help(message);
      return(true);
    } else if (message.content.startsWith('poll help')) {
      this.help(message);
      return(true);
    } else if (message.content.startsWith('poll vote')) {
      this.vote(message);
      return(true);
    } else if (message.content.startsWith('poll vote help')) {
      this.vote_help(message);
      return(true);
    } else if (message.content.startsWith('poll list')) {
      this.list(message);
      return(true);
    } else if (message.content.startsWith('poll list help')) {
      this.list_help(message);
      return(true);
    } else if (message.content.startsWith('poll close')) {
      this.close(message);
      return(true);
    } else if (message.content.startsWith('poll close help')) {
      this.close_help(message);
      return(true);
    } else {
      console.log('message not intended for poll');
      return(false);
    }
  }
}
```

TODO: Finish README and implementation of poll.js

Start by implementing the create and create help functions.

```js
```

