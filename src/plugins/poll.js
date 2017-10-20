class PollPlugin {
  /*
   TODO: Move this documentation to where it's supposed to go.

   A poll is an object like the following:
   {
     title: "Poll One",
     id: 1
     options: [
       {
         id: 1,
         value: "Option 1"
         count: 0
       },
       {
         id: 2,
         value: "Option 2"
         count: 0
       }
     ]
   }
   */
  constructor() {
    this.polls = [];
    this.current_id = 0;
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

  list(message) {
    let response = '';

    let max_id_length = 0;
    let max_title_length = 0;

    for (let poll of this.polls) {
      max
      response +=  + String(poll.id) + ' Title: ' + poll.title + '\n';
    }

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
