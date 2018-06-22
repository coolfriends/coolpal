/**
 * TODO: This interface needs to be vastly improved to easily handle CLI-like args
 *       I wonder if commander can take a string?
 **/
export function split_message(message) {
  let content_array = message.content.split(" ");
  let lowercase_content_array = [];
  for (let item of content_array) {
    lowercase_content_array.push(item.toLowerCase());
  }
  return lowercase_content_array;
}

export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function times(n) {
  return f => {
    Array(n)
      .fill()
      .map((_, i) => f(i));
  };
}

/**
 * Use code-block as a workaround to get some colorization.
 *
 * @argument {string} s - The string that will be colored.
 * @argument {color} A string representing one of the available colors
 *
 * Returns the original string if the color doesn't exist.
 */
export function color(s, color) {
  if (color === "green") return "```css\n" + s + "\n```";
  if (color === "yellow") return "```fix\n" + s + "\n```";
  return s;
}
