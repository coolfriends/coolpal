let polls = [
  {
    title: "Poll One",
    id: 1,
    options: [
      {
        id: 1,
        value: "Option 1",
        count: 0
      },
      {
        id: 12,
        value: "Option 2",
        count: 0
      }
    ]
  },
  {
    title: "Poll Three Hundred",
    id: 301,
    options: [
      {
        id: 1,
        value: "Option 1",
        count: 0
      },
    ]
  }
];

let display_poll = (poll, padding) => {
  let display_string = '';
  let id_string = String(poll.id);
  let padding_diff = padding - id_string.length;
  let padding_string = ' '.repeat(padding_diff);

  display_string += id_string + padding_string + poll.title + '\n';

  return display_string;
};

let max_poll_id_length = polls => {
  let max_length = 0;
  for (let poll of polls) {
    let poll_id_length = String(poll.id).length;
    if (poll_id_length > max_length) {
      max_length = poll_id_length;
    }
  }
  return max_length;
};

let display_polls_heading = (padding) => {
  let first_heading = 'Poll Id';
  let first_break = '-'.repeat(first_heading.length);
  let second_heading = 'Title';
  let second_break = '-'.repeat(second_heading.length);
  let padding_diff = padding - first_heading.length;
  let padding_string = ' '.repeat(padding_diff);

  let title_row = first_heading + padding_string + second_heading + '\n';
  let break_row = first_break + padding_string + second_break + '\n';

  return title_row + break_row;
};

let display_polls = (polls) => {
  let display_string = '';

  // Figure out how much padding is needed between Id and Title
  let max_length = max_poll_id_length(polls);

  // Padding adjustment of 10 to get title row looking nice
  let adjusted_padding = max_length + 10;
  for (let poll of polls) {
    display_string += display_poll(poll, adjusted_padding);
  }

  let heading = display_polls_heading(adjusted_padding);

  return heading + display_string;
};

// Set padding between id and title
let padding = 5;
console.log(display_polls(polls));
