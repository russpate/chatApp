


//GETTING USER NAME FROM LOCAL STORAGE


var usersName = localStorage.getItem('user');
  if (usersName === null){
  usersName = prompt("Enter Username");
  localStorage.setItem('user',usersName);
   $('#usersName').html("<span>" + usersName + "</span>");
} else {
  usersName = localStorage.getItem('user')
   $('#usersName').html("<span>" + usersName + "</span>");
}


//SIGN OUT FUNCTION

$('.signOut').on('click', function(event){
  localStorage.clear('user',usersName);
  usersName = prompt("Enter Username");
  localStorage.setItem('user',usersName);
   $('#usersName').html("<span>" + usersName + "</span>");
});





















//EMPTY todo ARRAY
var chatArray = [
]

//GRABBING THE todo IN THE INPUT ON THE DOM
//THIS RETURNS AN OBJECT
function getMsgFromDom() {
  var msg = $('input[name="msg"]').val();
  return {
    msg: msg,
    username: usersName
  }
}

//ADDING THE NEW todo TO THE EMPTY ARRAY
function addMsg(newMsg) {
  chatArray.push(newMsg);
}

//GRABBING THE NEW ARRAY WITH NEW todo IN IT
//THIS REUTRNS AN ARRAY
function getMsg() {
  return chatArray;
}

//STRUCTURE FOR ADDING THE NEW ARRAY TO THE DOM
function addMsgToDom(newMsg, templateStr, $target) {
    var tmpl = _.template(templateStr);
    $target.prepend(tmpl(newMsg));
}


//ADDING ALL THE todos TO THE DOM
function addAllMsg(arr) {
  $('.messageContainer').html('');
  _.each(getMsg(), function (el) {
    addMsgToDom(el, templates.msgBox, $('.messageContainer'));
  });
}

//END FUNCTION
function end(){ addAllMsg(getMsg());}

//DELETING todo
function deleteTodo(idx) {
  toDo.splice(idx, 1);
}

//STYLING IN JAVASCIRPT
function cssStyle($target, attr, property){
  $target.css(attr, property)};

//PREVENT DEFAULT
function prevent(){event.preventDefault();}




//NOW START CALLING FUNCTIONS


$(document).ready(function () {
  end();


//CLICKING SUBMIT AND MAKING todo APPEND TO PAGE
  $('.submit').on('click', function (event) {
    prevent();
    var newMsg = getMsgFromDom();
      addMsg(newMsg);
      $('input[name="msg"]').val('');
      end();
  });

//CLICKING THE COMPLETED BUTTON
//CHANGING COMPLETE FALSE TO TRUE
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

//CLICK DELETE THAT DELETES todo AND CHANGE NUMBER OF ITEMS
  $('.todoContainer').on('click', '.delete', function (event) {
    prevent();
    var idx = $(this).closest('div').data('idx');
    deleteTodo(idx);
    end();
  });

//CLICK CLEAR ALL AND CLEARS ALL COMPLETED
  $('footer').on('click', '.clear', function (event) {
    prevent();
    var completed = _.where(toDo,{complete: true});
    completed.forEach(function(el) {
      deleteTodo(toDo.indexOf(el));
    });
    end();
  });

//CLICK ACTIVE BUTTON AND ONLY SHOW ACTIVE ITEMS
$('footer').on('click', '.active', function (event) {
  prevent();
  var completed = _.where(toDo,{complete: false});
  function addAllTodos(arr) {
    $('.todoContainer').html('');
    _.each(completed, function (el, idx) {
      el.idx = idx;
      addTodoToDom(el, templates.todo, $('.todoContainer'));
    })
  }
  addAllTodos(completed);
});

//CLICK ALL AND SHOWS ALL ITEMS THAT ARE COMPLETED AND ACTIVE
$('footer').on('click', '.all', function (event) {
  prevent();
    end();
});

//CLICK COMPLETED BUTTON AND ONLY SHOWS COMPLETED
$('footer').on('click', '.completed', function (event) {
  prevent();
  var completed = _.where(toDo,{complete: true});
  function addAllTodos(arr) {
    $('.todoContainer').html('');
    _.each(completed, function (el, idx) {
      el.idx = idx;
      addTodoToDom(el, templates.todo, $('.todoContainer'));
    })
  }
  addAllTodos(completed);
});
});
