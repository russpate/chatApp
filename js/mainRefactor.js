

$(document).ready(function() {
  chatApp.init();
  chatApp.end();
   setInterval(function(){chatApp.getMsg();}, 1000);
});

//GETTING USERNAME FROM LOCAL STORAGE
var usersName = localStorage.getItem('user');
  if (usersName === null){
  usersName = prompt("Enter Username");
  localStorage.setItem('user',usersName);
   $('#usersName').html("<span>" + usersName + "</span>");
} else {
  usersName = localStorage.getItem('user');
   $('#usersName').html("<span>" + usersName + "</span>");
}


var chatArray = [];

var chatApp = {
  // window.setTimeout(chatApp.addMsg, 2000);
  url: 'http://tiny-tiny.herokuapp.com/collections/main',
  init: function() {
    chatApp.styling();
    chatApp.events();
  },
  styling: function(){
  },
  events: function(){
    $('.submit').on('click', chatApp.submitMsg);
    $('.signOut').on('click', chatApp.signOut);
    $('.messageContainer').on('click', 'button', chatApp.deleteMsgFromDom );

  },

  submitMsg: function (event) {
    chatApp.prevent();
    var newMsg = chatApp.getMsgFromDom();
      chatApp.addMsg(newMsg);
      $('input').val('');
      // $('input[name="msg"]').val('');
      // chatApp.end();
  },

  signOut: function(event){
    localStorage.clear('user',usersName);
    usersName = prompt("Enter Username");
    localStorage.setItem('user',usersName);
     $('#usersName').html("<span>" + usersName + "</span>");
  },











  getMsgFromDom: function () {
    var msg = $('input[name="msg"]').val();
    return {
      msg: msg,
      username: usersName
    }
  },

  deleteMsgFromDom: function (event) {
  var postId = $(this).closest('.msgBox').data('postid');
  chatApp.deleteMsg(postId);
  chatApp.addAllMsg();
},

addAllMsg: function(arr) {
  $('.messageContainer').html('');
  _.each(arr, function (el) {
    var tmpl = _.template(templates.msgBox);
    $('.messageContainer').prepend(tmpl(el));
  });
},

getMsg: function() {
  $.ajax({
    url: chatApp.url,
    method: 'GET',
    success: function (msg) {
      console.log(msg);
      chatApp.addAllMsg(msg);
    },
    error: function (err) {
      console.log(err);
    }
  });
},



  addMsg: function(newMsg) {
    $.ajax({
      url: 'http://tiny-tiny.herokuapp.com/collections/main',
      method: 'POST',
      data: newMsg,
      success: function (response) {
        chatApp.getMsg();
      },
      error: function (err) {
        console.log("error", err);
      }
    })
  },


  deleteMsg: function (postId) {
    console.log("http://tiny-tiny.herokuapp.com/collections/main" + '/' + postId);
    $.ajax({
      url: chatApp.url + '/' + postId,
      method: 'DELETE',
      success: function (response) {
        chatApp.getMsg();
      }
    });
  },


end: function(){ chatApp.addAllMsg(chatApp.getMsg());
},

  prevent: function(){
    event.preventDefault();
  }

}; // end var chatApp
