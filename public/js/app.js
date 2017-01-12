// function addUpvote() {
//   xhr = new XMLHttpRequest();
//
//   xhr.open('POST', '/api/allrecipes', true);
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status == 201) {
//       var newUpvotes = JSON.parse(xhr.responseText);
//       console.log(newUpvotes.id + ' ' + newUpvotes.votes)
//     } else if (xhr.readyState === 4 && xhr.status == 200) {
//       var upvoteMessage = JSON.parse(xhr.responseText);
//       console.log(upvoteMessage);
//     }
//
//   };
// }
//
//
// document.addEventListener('DOMContentLoaded', function() {
//
// });

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
