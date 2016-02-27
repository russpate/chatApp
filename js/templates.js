var templates = {};



templates.msgBox = [

    // '<div data-idx="<%= _id %>">',
    '<div class="msgBox">',
    '<h5><%= username %></h5>',
    '<p><%= msg %></p>',
    '<% if (obj.username === localStorage.getItem("user")){%>',
    '<button type="button" name="Delete" class="delete-post">x</button>',
    '<%}%>',
    '</div>'

].join("");
