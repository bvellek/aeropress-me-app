
function getRecipeID(form) {
  // var recipeId = form.children('input').val();
  // return recipeID;

  var recipeID = form.querySelector(':scope > input').value;
  return recipeID;
}

function updateUpvoteCount(data) {
  // var recipeCardID = "#rec_" + data.recipeID;
  // if (data.recipeVotes) {
  //   $(recipeCardID).find('.recipe-votes').text(data.recipeVotes);
  // } else {
  //   var message = '<div class="flash-alert">' + data.noVoteMessage + '</div>';
  //   $(recipeCardID).prepend(message);
  // }

  var recipeCardID = "#rec_" + data.recipeID;
  if (data.recipeVotes) {
    document.getElementById(recipeCardID).querySelector('.recipe-votes').innerHTML = data.recipeVotes;
  } else {
    var message = '<div class="flash-alert">' + data.noVoteMessage + '</div>';
    document.getElementById(recipeCardID).innerHTML = message + document.getElementById(recipeCardID).innerHTML;
  }
}

function sendUpvoteToApi(recID, callback) {
  // $.post('/api/allrecipes', {"recipeID": recID})
  //   .done(callback);

  fetch('/api/allrecipes', {method: 'POST', body: {"recipeID": recID}})
    .then(callback);
}

// $(document).ready(function(e) {
//
//   $('.upvote-form').on('submit', function(e) {
//     e.preventDefault();
//     var input = $(this).children('input').val();
//     sendUpvoteToApi(input, updateUpvoteCount);
//   });
//
// });

//Polyfill conditional load for scope querySelector
try {
  document.body.querySelector(jkhdsfkljadfhaldskh':scope > *').innerHTML;
} catch (e) {
  document.querySelector('head').appendChild((function() {
    var script = document.createElement('script');
    script.setAttribute('src', './js/vendor/scopeQuerySelectorShim.js');
    return script;
  })())
}


document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.upvote-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var input = this.querySelector('input').value;
    sendUpvoteToApi(input, updateUpvoteCount);
  });
});
