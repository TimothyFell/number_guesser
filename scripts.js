function set_num() {
  min = 1;
  max = 100;
  correct_number = Math.ceil(Math.random() * max);
  $("#error").hide();
  $("#response").hide();
}


function check_guess(guess) {
  if (guess < correct_number) {
    return "That is too low"
  } else if (guess > correct_number) {
    return "That is too high"
  } else {
    return "BOOM!"
  }
}

function validate_guess(guess) {
  var guess_num = parseInt(guess);
  if (isNaN(guess_num)) {
    return false
  } else {
    return true
  }
}

function submit_guess() {
  var guess = $("#guess").val();
  if (validate_guess(guess)) {
    console.log("validated");
    $("#response").show();
    $("#recent-guess").html(guess);
    $("#response-message").html(check_guess(guess));
    return true
  } else {
    console.log("didnt validate");
    $("#error").show();
    $("#error").html("That's not a number, try again.");
    return false
  }
}

function clear_guess() {
  $("#guess").val("")
}

window.onload = set_num;


$(document).ready( function() {

  $("#submit").click(submit_guess);

  $("#clear").click(clear_guess);

});
