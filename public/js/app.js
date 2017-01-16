
function getRecipeID(form) {
  var recipeId = form.children('input').val();
  return recipeID;
}

function updateUpvoteCount(data) {
  var recipeCardID = "#rec_" + data.recipeID;
  if (data.recipeVotes) {
    $(recipeCardID).find('.recipe-votes').text(data.recipeVotes);
  } else {
    var message = '<div class="flash-alert">' + data.noVoteMessage + '</div>';
    $(recipeCardID).prepend(message);
  }
}


function sendUpvoteToApi(recID, callback) {
  $.post('/api/allrecipes', {"recipeID": recID})
    .done(callback);
}


$(document).ready(function(e) {

  $('.upvote-form').on('submit', function(e) {
    e.preventDefault();
    var input = $(this).children('input').val();
    sendUpvoteToApi(input, updateUpvoteCount);
  });

});
