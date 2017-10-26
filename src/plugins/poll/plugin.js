// TODO: Finish implementing Poll plugin
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
     ],
     open: true
   }
   */
  constructor() {
    this.command = 'poll';
    this.supported_event_types = ['message'];
    this.polls = [];
    this.current_id = 0;
  }

  handle_message(message) {
    if (message.content.startsWith('poll create help')) {
      this.create_help(message);
      return(true);
    } else if (message.content.startsWith('poll create')) {
      this.create(message);
      return(true);
    } else if (message.content.startsWith('poll help')) {
      this.help(message);
      return(true);
    } else if (message.content.startsWith('poll vote help')) {
      this.vote_help(message);
      return(true);
    } else if (message.content.startsWith('poll vote')) {
      this.vote(message);
      return(true);
    } else if (message.content.startsWith('poll list help')) {
      this.list_help(message);
      return(true);
    } else if (message.content.startsWith('poll list')) {
      this.list(message);
      return(true);
    } else if (message.content.startsWith('poll options help')) {
      this.options_help(message);
      return(true);
    } else if (message.content.startsWith('poll options')) {
      this.options(message);
      return(true);
    } else if (message.content.startsWith('poll close help')) {
      this.close_help(message);
      return(true);
    } else if (message.content.startsWith('poll close')) {
      this.close(message);
      return(true);
    } else {
      console.log('message not intended for poll');
      return(false);
    }
  }

  create(message) {
    let poll = this.create_poll(message);
    this.polls.push(poll);

    let response = "Successfully created your poll: " + poll.title + "\n" +
                   "Access your poll with id: " + String(poll.id);

    message.reply(response);
  }

  // TODO: Reformulate how title is obtained after rework of messaging (e.g. when args are)
  // passed in alongside the original message
  create_poll(message) {
    this.current_id += 1;
    let title = message.content.replace('todo create ', '');
    // Removes new lines and carriage returns
    let safe_title = title.replace(/\n|\r/g,'');
    return {
      id: this.current_id,
      title: safe_title,
      options: {},
      open: true
    };
  }

  create_help(message) {
    let response = "poll create Title of Your Poll";
    message.reply(response);
  }

  list(message) {
    message.reply(this.display_polls());
  }

  list_help(message) {
    let response = '';
    response += "poll list\n" +
                "Displays all available polls.\n";
    message.reply(response);
  }

  options(message) {
    let id = message.content.replace('todo create ', '');
    // Adapted isInteger from Stack Overflow:
    // https://stackoverflow.com/questions/37674069/javascript-check-if-string-can-be-converted-to-integer
    // Verify that argument is an integer
    if (/^\d+$/.test(id)) {
      let found_poll = null;
      for (let poll of this.polls) {
        if (poll.id == Number(id)) {
          found_poll = poll;
          break;
        }
      }

      // Poll with that id doesn't exist
      if (!found_poll) {
        message.reply("Poll with id " + id + " does not exist. See help for more information");
      } else {
        message.reply(this.display_options(found_poll));
      }
    } else {
      message.reply("Poll id provided: " + id + " is not a valid id.");
    }
  }

  vote(message) {
    console.log("INFO: stub poll vote");
  }

  vote_help(message) {
    message.reply("poll vote [poll_id] [option_id]");
  }

  close(message) {
    console.log("INFO: stub poll close");
  }

  close_help(message) {
    console.log("INFO: stub poll close_help");
  }

  results(message) {
  }

  results_help(message) {
  }

  help(message) {
    console.log("INFO: stub poll help");
  }

  display_poll(poll, padding) {
    let id_string = String(poll.id);
    let padding_diff = padding - id_string.length;
    let padding_string = ' '.repeat(padding_diff);

    return id_string + padding_string + poll.title + '\n';
  }

  max_poll_id_length(polls) {
    let max_length = 0;
    for (let poll of polls) {
      let poll_id_length = String(poll.id).length;
      if (poll_id_length > max_length) {
        max_length = poll_id_length;
      }
    }
    return max_length;
  }

  display_polls_heading(padding) {
    let poll_id_heading = 'Poll Id';
    let poll_id_break = '-'.repeat(poll_id_heading.length);

    let title_heading = 'Title';
    let title_break = '-'.repeat(title_heading.length);

    let padding_diff = padding - poll_id_heading.length;
    let padding_string = ' '.repeat(padding_diff);

    let title_row = poll_id_heading + padding_string + title_heading + '\n';
    let break_row = poll_id_break + padding_string + title_break + '\n';

    return title_row + break_row;
  }

  display_polls() {
    let display_string = '';

    // Figure out how much padding is needed between Poll Id and Title
    let max_length = this.max_poll_id_length(this.polls);

    // Padding adjustment of 10 to get title row looking nice
    let adjusted_padding = max_length + 10;
    for (let poll of this.polls) {
      display_string += this.display_poll(poll, adjusted_padding);
    }

    let heading = this.display_polls_heading(adjusted_padding);

    return heading + display_string;
  }

  max_option_id_length(poll) {
    let display_string = '';
    let max_length = 0;
    for (let option of poll.options) {
      let id_length = String(option.id).length;
      if (id_length > max_length) {
        max_length = id_length;
      }
    }
  }

  display_option(option, padding) {
    let id_string = String(option.id);
    let padding_diff = padding - id_string.length;
    let padding_string = ' '.repeat(padding_diff);

    return id_string + padding_string + option.name + '\n';
  }

  display_options_heading(padding) {
    let option_id_heading = 'Option Id';
    let option_id_break = '-'.repeat(option_id_heading.length);

    let option_heading = 'Option';
    let option_break = '-'.repeat(option_heading.length);

    let padding_diff = padding - option_id_heading.length;
    let padding_string = ' '.repeat(padding_diff);

    let title_row = option_id_heading + padding_string + option_heading + '\n';
    let break_row = option_id_break + padding_string + option_break + '\n';

    return title_row + break_row;
  }

  display_options(poll) {
    let display_string = '';

    // Figure out how much padding is needed between Option Id and Option
    let max_length = this.max_option_id_length(poll);

    // Padding adjustment of 15 to get title row looking nice
    let adjusted_padding = max_length + 15;
    for (let option of poll.options) {
      display_string += this.display_option(option, adjusted_padding);
    }

    let heading = this.display_polls_heading(adjusted_padding);

    return heading + display_string;
  }
};


module.exports = PollPlugin;
