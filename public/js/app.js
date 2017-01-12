
function getRecipeID(form) {
  var recipeId = form.children('input').val();
  return recipeID;
}

function updateUpvoteCount(data) {
  console.log(data);
}


function sendUpvoteToApi(recID, callback) {
  console.log(recID);
  $.post('/api/allrecipes', {"recipeID": recID})
    .done(callback);
}


$(document).ready(function(e) {

  $('.upvote-form').on('submit', function(e) {
    e.preventDefault();
    console.log(this);
    var input = $(this).children('input').val();
    console.log(input);
    sendUpvoteToApi(input, updateUpvoteCount);
  });

});
