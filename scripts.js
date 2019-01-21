function set_num() {
  min = 1;
  max = 100;
  correct_number = Math.ceil(Math.random() * max);
  $("#error").hide();
  $("#response").hide();
  $("#clear").attr("disabled", "disabled");
  $("#reset").attr("disabled", "disabled");
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
    $("#error").html("That's not a number, try again.");
    return false
  } else if (guess_num > max || guess_num < min) {
    $("#error").html("That's outside our range, try again.");
    return false
  } else {
    return true
  }
}

function submit_guess() {
  $("#error").hide();
  $("#clear").attr("disabled", null);
  $("#reset").attr("disabled", null);
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
    return false
  }
}

function clear_guess() {
  $("#error").hide();
  $("#response").hide();
  $("#guess").val("")
  $("#clear").attr("disabled", "disabled");
}

function reset_game() {
  $("#guess").val("")
  set_num();
  $("#error").html("New Game!");
  $("#error").show();
}

window.onload = set_num;


$(document).ready( function() {

  $("#submit").click(submit_guess);

  $("#clear").click(clear_guess);

  $("#reset").click(reset_game);

});
