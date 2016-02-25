/*jshint ignore: start */

$(document).ready(function() {
  var userNameAnswer = prompt('username');
  var userAnswer = chatApp.getFromPrompt(userNameAnswer);
  data.push(userAnswer);
  $('.userBox h3').text(userNameAnswer);
});



var chatApp = {
  url: 'http://tiny-tiny.herokuapp.com/collections/',
  init: function(){

  },
  initStyle: function(){

  },
  initEvent: function(){

  },
  getFromPrompt: function(userNameAnswer){
    return{
      username: userNameAnswer
    }
  },
  getFromInput: function(){
    var messageContent = $('input'[type='text']).val();
    return{
      content: content
    }
  },
  addData: function(newData){
    data.push(newData);
  },
  deleteMessage: function(id){
    $.ajax({
      url:  chatApp.url + "/" + id,
      method: 'DELETE',
      success: function(response){
        chatApp.getFromInput();
      }
    });
  },
  deleteFromDom: function(){
  },
  // addUserNameToPage: function(tmplStr, $target){
  //   var tmpl = _.template(tmplStr);
  //   $target.html(tmpl(chatApp.getFromPrompt()));
  // }


}; // end var chat app
