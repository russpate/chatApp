/*jshint ignore: start */

$(document).ready(function() {
    // var userNameAnswer = prompt('username');
    // var userAnswer = chatApp.getFromPrompt(userNameAnswer);
    // data.push(userAnswer);
    // $('.userBox h3').text(userNameAnswer);

  data.init();
});

var chatApp = {
    // need to create our <collectionName>
  url: 'http://tiny-tiny.herokuapp.com/collections/',
    // ** needs to be updated for  our project
  init: function(){
    data.initEvents();
    data.initStyling();
  },
    // ** needs to be updated for  our project
  initStyle: function(){
    myBlog.getPosts();
  },
  initEvent: function(){
    // ** these need to be updated for our project
    // but these are the starting parts to the click
    // events.
    $('form').on('submit', myBlog.submitPost);
    $('section').on('click', '.delete', myBlog.deletePostFromDom);
  },
    // we can probably change this since we won't
    // be needing the prompt anymore.
  getFromPrompt: function(userNameAnswer){
    return{
      username: userNameAnswer
    }
  },
    // since we may be using multiple inputs we will
    // probably need think about how this can work for
    // multiple input events or create an additional
    // function for our new input.
  getFromInput: function(){
    var messageContent = $('input'[type='text']).val();
    return{
      content: content
    }
  },
    // adds the new information to the data array
  addData: function(newData){
    data.push(newData);
  },
    // deletes messages from chatbox
  deleteMessage: function(id){
    $.ajax({
      url:  chatApp.url + "/" + id,
      method: 'DELETE',
      success: function(response){
        chatApp.getFromInput();
      }
    });
  },
    // ** This needs to be updated for our project
  deleteFromDom: function(){
    var postId = $(this).closest('article').data('postid');
    myBlog.deletePost(postId);
    myBlog.addAllPostsToDom();
  },

  // addUserNameToPage: function(tmplStr, $target){
  //   var tmpl = _.template(tmplStr);
  //   $target.html(tmpl(chatApp.getFromPrompt()));
  // }


}; // end var chatApp
