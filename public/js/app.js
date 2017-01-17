//
// function getRecipeID(form) {
//   var recipeID = form.querySelector(':scope > input').value;
//   return recipeID;
// }

// Polyfill conditional load for scope querySelector
// try {
//   document.body.querySelector(':scope > *').innerHTML;
// } catch (e) {
//   document.querySelector('head').appendChild((function() {
//     var script = document.createElement('script');
//     script.setAttribute('src', './js/vendor/scopeQuerySelctorShim.js');
//     return script;
//   })())
// }

function updateUpvoteCount(data) {
  var recipeCardID = "rec_" + data.recipeID;
  if (data.recipeVotes) {
    document.getElementById(recipeCardID).querySelector('.recipe-votes').innerHTML = data.recipeVotes;
  } else {
    var message = '<div class="flash-alert">' + data.noVoteMessage + '</div>';
    document.getElementById(recipeCardID).innerHTML += message;
  }
}

function sendUpvoteToApi(recID, callback) {
  // fetch('/api/allrecipes', {method: 'post', body: JSON.stringify({'recipeID': recID})})
  //   .then(callback);
  xhr = new XMLHttpRequest();
  var url = '/api/allrecipes';
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var json = JSON.parse(xhr.responseText)
      console.log();
      callback(json);
    }
  }
  var data = JSON.stringify({
    'recipeID': recID
  });
  xhr.send(data);
}


document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.upvote-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log(this);
      var input = this.querySelector('input').value;
      console.log(input);
      sendUpvoteToApi(input, updateUpvoteCount);
    });
  })
});






//Code using jQuery
// function getRecipeID(form) {
//   var recipeId = form.children('input').val();
//   return recipeID;
// }
//
//
// function updateUpvoteCount(data) {
//   var recipeCardID = "#rec_" + data.recipeID;
//   if (data.recipeVotes) {
//     $(recipeCardID).find('.recipe-votes').text(data.recipeVotes);
//   } else {
//     var message = '<div class="flash-alert">' + data.noVoteMessage + '</div>';
//     $(recipeCardID).prepend(message);
//   }
// }
//
//
//
// function sendUpvoteToApi(recID, callback) {
//   $.post('/api/allrecipes', {"recipeID": recID})
//     .done(callback);
// }


// $(document).ready(function(e) {
//
//   $('.upvote-form').on('submit', function(e) {
//     e.preventDefault();
//     var input = $(this).children('input').val();
//     sendUpvoteToApi(input, updateUpvoteCount);
//   });
//
// });
