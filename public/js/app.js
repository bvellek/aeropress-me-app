function updateUpvoteCount(data) {
  var recipeCardID = "rec_" + data.recipeID;
  if (data.recipeVotes) {
    document.getElementById(recipeCardID).querySelector('.recipe-votes').innerHTML = data.recipeVotes;
    var successMessage = '<div class="success-flash-alert">' + data.successVoteMessage + '</div>';
    document.getElementById(recipeCardID).innerHTML += successMessage;
  } else {
    var message = '<div class="flash-alert">' + data.noVoteMessage + '</div>';
    document.getElementById(recipeCardID).innerHTML += message;
  }
}

function sendUpvoteToApi(recID, callback) {
  xhr = new XMLHttpRequest();
  var url = '/api/allrecipes';
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var json = JSON.parse(xhr.responseText);
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
      this.querySelector('button').disabled = true;
      this.querySelector('button').style.display = "none";
      var input = this.querySelector('input').value;
      sendUpvoteToApi(input, updateUpvoteCount);
    });
  })
});
