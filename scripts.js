

function check_guess() {

}

function validate_guess() {

}

function submit_guess() {
// store guess as variable
  var guess = $("#guess").val();
// validates guess and checks guess to see if its correct
  var response = check_guess(guess);

  $(#response).show();
}

function clear_guess() {

}



function reset_game() {

}


$(document).ready( function() {

  $("#submit").click(submit_guess);

});
