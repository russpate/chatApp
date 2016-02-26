// /*jshint ignore: start */

$(document).ready(function() {
  chatApp.init();
});

var chatApp = {
  url: 'http://tiny-tiny.herokuapp.com/collections/chatAppThree',
  init: function(){
    chatApp.initEvent();
    chatApp.initStyle();
  },
  initStyle: function(){
    // chatApp.getUserName();
  },
  initEvent: function(){
    // $('form').on('click','button',chatApp.postUserNameToDatabase);
    $('form').on('click','button',chatApp.submitUserName);
    $('.chatBox').find('form').on('submit',chatApp.postMessageToDatabase);
  },
  //UTILITY FUNCTIONS
      //get username from input
  getFromPrompt: function(){
    var userNameAnswer = $('form').children('input[name="welcome"]').val();
    localStorage.setItem('username', userNameAnswer);
  },
    //add username to page
  addUserNameToPage: function(newUserName,tmplStr, $target){
    var tmpl = _.template(tmplStr);
    $target.append(tmpl(newUserName));
  },
    //add multiple usernames to page
  addAllUserNamesToPage: function(arr) {
    $('aside').html('');
      _.each(arr, function (el) {
      chatApp.addUserNameToPage(el, templates.userBox, $('aside'));
    });
  },
  //adding new username to database and posting everything to page
data: [],

submitUserName: function(){
  event.preventDefault();
  chatApp.addUserNameToPage({username: localStorage.getItem('username')}, templates.userBox, $('aside'));
  chatApp.getFromPrompt();
  $(this).parents().removeClass('current');
  $(this).parents().siblings().addClass('current');
},

    //start chatting
  getFromInput: function(){
    var userMessage = $('.chatBox').closest('input[name="messages"]').val();
    console.log("user message: ", userMessage);
    var user = localStorage.getItem('username');
    return{
      content: userMessage,
      username: user
    };
  },
    //add message to page
  addMessageToPage: function(newMessage,tmplStr, $target){
    var tmpl = _.template(tmplStr);
    $target.append(tmpl(newMessage));
  },
    //add multiple messages to page
  addAllMessagesToPage: function(arr) {
    $('.chatBox').html('');
      _.each(arr, function (el) {
      chatApp.addMessageToPage(el, templates.messageBox, $('.chatBox'));
    });
  },
  //adding new message to database and posting everything to page
postMessageToDatabase: function(event) {
  event.preventDefault();
  var message = chatApp.getFromInput();
  $.ajax({
    url: chatApp.url,
    method: 'POST',
    data: message,
    success: function(data) {
      chatApp.data.push(data);
      chatApp.addAllMessagesToPage(chatApp.data);
    },
    error: function() {
      console.log(data);
    }
  });
},
  getMessage: function(){
    $.ajax({
      url:  chatApp.url,
      method: 'GET',
      success: function(response){
        chatApp.data = response;
        chatApp.addAllMessagesToPage(chatApp.data);
      },
      error: function(err) {
      }
    });
  }


}; // end var chatApp
