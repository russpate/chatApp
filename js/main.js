

$(document).ready(function() {
  chatApp.init();
  chatApp.addAllMsg(chatApp.getMsg());
   setInterval(function(){chatApp.getMsg();}, 2000);
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


//STARTING OBJECT LITTERAL
var chatApp = {
  url: 'http://tiny-tiny.herokuapp.com/collections/main',
  init: function() {
    chatApp.styling();
    chatApp.events();
  },
  styling: function(){
    chatApp.getMsg();
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
  },

  signOut: function(event){
    localStorage.clear('user',usersName);
    usersName = prompt("Enter Username");
    localStorage.setItem('user',usersName);
     $('#usersName').html("<span>" + usersName + "</span>");
  },

//UTILITY FUNCTIONS
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
     $('.messageContainer').scrollTop($('.messageContainer')[0].scrollHeight);
  });
},

getMsg: function() {
  $.ajax({
    url: chatApp.url,
    method: 'GET',
    success: function (msg) {
      chatApp.addAllMsg(msg);
    },
    error: function (err) {
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
      }
    })
  },

  deleteMsg: function (postId) {
    $.ajax({
      url: chatApp.url + '/' + postId,
      method: 'DELETE',
      success: function (response) {
        chatApp.getMsg();
      }
    });
  },

  prevent: function(){
    event.preventDefault();
  }

};
