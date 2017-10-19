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

  create(message) {
    console.log("INFO: stub poll create");
  }

  create_help(message) {
    console.log("INFO: stub poll create_help");
  }

  list(message) {
    console.log("INFO: stub poll list");
  }

  list_help(message) {
    console.log("INFO: stub poll list_help");
  }

  vote(message) {
    console.log("INFO: stub poll vote");
  }

  vote_help(message) {
    console.log("INFO: stub poll vote_help");
  }

  close(message) {
    console.log("INFO: stub poll close");
  }

  close_help(message) {
    console.log("INFO: stub poll close_help");
  }

  help(message) {
    console.log("INFO: stub poll help");
  }

};

module.exports = PollPlugin;
