$(document).ready(function() {
  chatApp.init();
  chatApp.end();
});
var chatArray = [];
var usersName = localStorage.getItem('user');
  if (usersName === null){
  usersName = prompt("Enter Username");
  localStorage.setItem('user',usersName);
   $('#usersName').html("<span>" + usersName + "</span>");
} else {
  usersName = localStorage.getItem('user');
   $('#usersName').html("<span>" + usersName + "</span>");
}
var chatApp = {
  init: function() {
    chatApp.styling();
    chatApp.events();
  },
  styling: function(){
  },
  events: function(){
    $('.submit').on('click', function (event) {
      prevent();
      var newMsg = chatApp.getMsgFromDom();
        chatApp.addMsg(newMsg);
        $('input[name="msg"]').val('');
        end();
    });
    $('.signOut').on('click', function(event){
      localStorage.clear('user',usersName);
      usersName = prompt("Enter Username");
      localStorage.setItem('user',usersName);
       $('#usersName').html("<span>" + usersName + "</span>");
    });
    $('body').on('click', '.complete', function (event) {
      prevent();
      var indexOfOurTodo = $(this).parent().data('idx');
      toDo[indexOfOurTodo].complete = !toDo[indexOfOurTodo].complete;
      if(!toDo[indexOfOurTodo].complete) {
        $(this).removeClass('line');
        $(this).siblings('p').css('text-decoration', 'none');
      } else {
        $(this).addClass('line');
        $(this).siblings('p').css('text-decoration', 'line-through');
      }
      end();
    });
    $('.todoContainer').on('click', '.delete', function (event) {
      prevent();
      var idx = $(this).closest('div').data('idx');
      chatApp.deleteTodo(idx);
      end();
    });

    $('footer').on('click', '.active', function (event) {
      chatApp.prevent();
      var completed = _.where(toDo,{complete: false});
      function addAllTodos(arr) {
        $('.todoContainer').html('');
        _.each(completed, function (el, idx) {
          el.idx = idx;
          chatApp.addTodoToDom(el, templates.todo, $('.todoContainer'));
        });
      }
      chatApp.addAllTodos(completed);
    });
    $('footer').on('click', '.all', function (event) {
      prevent();
        end();
    });
    $('footer').on('click', '.completed', function (event) {
      chatApp.prevent();
      var completed = _.where(toDo,{complete: true});
      function addAllTodos(arr) {
        $('.todoContainer').html('');
        _.each(completed, function (el, idx) {
          el.idx = idx;
          chatApp.addTodoToDom(el, templates.todo, $('.todoContainer'));
        });
      }
      chatApp.addAllTodos(completed);
    });
  }, // end of events:

  getMsgFromDom: function () {
    var msg = $('input[name="msg"]').val();
    return {
      msg: msg,
      username: usersName
    };
  },
  addMsg: function(newMsg) {
    chatArray.push(newMsg);
  },
  getMsg: function() {
    return chatArray;
  },
  addMsgToDom: function(newMsg, templateStr, $target) {
      var tmpl = _.template(templateStr);
      $target.append(tmpl(newMsg));
  },
  addAllMsg: function(arr) {
    $('.messageContainer').html('');
    _.each(chatApp.getMsg(), function (el) {
      chatApp.addMsgToDom(el, templates.msgBox, $('.messageContainer'));
    });
  },
  end: function(){ chatApp.addAllMsg(chatApp.getMsg());
  },
  deleteTodo: function(idx) {
    toDo.splice(idx, 1);
  },
  cssStyle: function($target, attr, property){
    $target.css(attr, property);
  },
  prevent: function(){event.preventDefault();
  }

}; // end var chatApp
