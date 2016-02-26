var templates = {};

// templates.userBox = [
//   "<div class='userBox'>",
//     "<h3>",
//     "<%= username %>",
//     "</h3>",
//   "</div>"
// ].join("");

templates.messageBox = [
  "<div class='messageBox'>",
    // "<h2>",
    // "<%= username %>",
    // "</h2>",
    "<div class='message'>",
    '<%= content %>',
    "</div>",
    "<button></button>",
  "</div>"
].join("");

// templates.newUser = [].join("");
