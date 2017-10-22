module.exports = {
  split_message: (message) => {
    let content_array = message.content.split(' ');
    let lowercase_content_array = [];
    for (let item of content_array) {
      lowercase_content_array.push(item.toLowerCase());
    }
    return lowercase_content_array;
  },
  capitalize: (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
};

