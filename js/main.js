/*jshint ignore: start */

$(document).ready(function() {


  chatApp.init();
});

var chatApp = {
  url: 'http://tiny-tiny.herokuapp.com/collections/chatApptwos',
  init: function(){
    chatApp.initEvent();
    chatApp.initStyle();
  },
  initStyle: function(){
    chatApp.getUserName();
  },
  initEvent: function(){
    $('form').on('click','button',chatApp.postUserNameToDatabase);
    $('form').on('click','button',chatApp.submitUserName);
  },


  //UTILITY FUNCTIONS
      //get username from input
  getFromPrompt: function(){
    var userNameAnswer = $('form').children('input'[name='welcome']).val();
    return{
      username: userNameAnswer
    }
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
    })
  },

  //adding new username to database and posting everything to page
postUserNameToDatabase: function() {
  var userName = chatApp.getFromPrompt();
  $.ajax({
    url: chatApp.url,
    method: 'POST',
    data: userName,
    success: function(data) {
      console.log(data);
      chatApp.data.push(data);
      chatApp.addAllUserNamesToPage(chatApp.data);
    },
    error: function() {
      console.log(data);
    }
  })
},
submitUserName: function(){
  event.preventDefault();
  $(this).parents().removeClass('current');
  $(this).parents().siblings().addClass('current');

},
  // getFromInput: function(){
  //   var messageContent = $('input'[type='text']).val();
  //   return{
  //     content: content
  //   }
  // },
  data: [],
  getUserName: function(){
    $.ajax({
      url:  chatApp.url,
      method: 'GET',
      success: function(response){
        chatApp.data = response;
        chatApp.addAllUserNamesToPage(chatApp.data);
      },
      error: function(err) {
      }
    });
  },

  // addData: function(newData){
  //   data.push(newData);
  // },

  // deleteMessage: function(id){
  //   $.ajax({
  //     url:  chatApp.url + "/" + id,
  //     method: 'DELETE',
  //     success: function(response){
  //       chatApp.getFromInput();
  //     }
  //   });
  // },


    // ** This needs to be updated for our project
  // deleteFromDom: function(){
  //   var postId = $(this).closest('article').data('postid');
  //   myBlog.deletePost(postId);
  //   myBlog.addAllPostsToDom();
  //
  //
  // },





}; // end var chatApp
