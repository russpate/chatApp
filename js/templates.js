var templates = {};

templates.msgBox = [
    // '<div data-idx="<%= _id %>">',
    '<div class="msgBox">',
    // '<h5><%= username %></h5>',
    '<div class="username"><%= username %></div><div class="message"><p><%= msg %></p></div>',
    '<% if (obj.username === localStorage.getItem("user")){%>',
    '<button type="button" name="Delete" class="delete-post"><i class="fa fa-trash-o"></i></button>',
    '<%}%>',
    '</div>'
].join("");
