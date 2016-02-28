


//GETTING USER NAME FROM LOCAL STORAGE


var usersName = localStorage.getItem('user');
  if (usersName === null){
  usersName = prompt("Enter Username");
  localStorage.setItem('user',usersName);
   $('#usersName').html("<span>" + usersName + "</span>");
} else {
  usersName = localStorage.getItem('user');
   $('#usersName').html("<span>" + usersName + "</span>");
}


//SIGN OUT FUNCTION

$('.signOut').on('click', function(event){
  localStorage.clear('user',usersName);
  usersName = prompt("Enter Username");
  localStorage.setItem('user',usersName);
   $('#usersName').html("<span>" + usersName + "</span>");
});



//EMPTY CHAT ARRAY
var chatArray = [
];

//GRABBING THE MSG IN THE INPUT ON THE DOM
//THIS RETURNS AN OBJECT
function getMsgFromDom() {
  var msg = $('input[name="msg"]').val();
  return {
    msg: msg,
    username: usersName
  };
}

//ADDING THE NEW MSG TO THE EMPTY ARRAY
function addMsg(newMsg) {
  chatArray.push(newMsg);
}

//GRABBING THE NEW ARRAY WITH NEW MSG IN IT
//THIS REUTRNS AN ARRAY
function getMsg() {
  return chatArray;
}

//STRUCTURE FOR ADDING THE NEW ARRAY TO THE DOM
function addMsgToDom(newMsg, templateStr, $target) {
    var tmpl = _.template(templateStr);
    $target.append(tmpl(newMsg));
}


//ADDING ALL THE MSGS TO THE DOM
function addAllMsg(arr) {
  $('.messageContainer').html('');
  _.each(getMsg(), function (el) {
    addMsgToDom(el, templates.msgBox, $('.messageContainer'));
  });
}

//END FUNCTION
function end(){ addAllMsg(getMsg());}

//DELETING MSG
function deleteMsg(idx) {
  chatArray.splice(idx, 1);
}

//STYLING IN JAVASCIRPT
function cssStyle($target, attr, property){
  $target.css(attr, property);}

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


//CLICK DELETE THAT DELETES MSG AND CHANGE NUMBER OF ITEMS
  $('.messageContainer').on('click', 'button', function (event) {
    console.log('click');
    prevent();
    var idx = $(this).closest('div').data('idx');
    deleteMsg(idx);
    end();
  });


// // adds a shadow to the message box with the user has to scroll
// // from this fiddle: http://jsfiddle.net/KVpBE/
// $('.messageContainer').scroll(function() {
//     var scroll = $('.messageContainer').scrollTop();
//     if (scroll > 0) {
//         $(".messageContainer").addClass("overflow");
//     }
//     else {
//         $(".messageContainer").removeClass("overflow");
//     }
// });
});
