var turns = 0

function set_num() {
  turns = 0
  min = $("#min").val();
  max = $("#max").val();
  // correct_number = Math.ceil(Math.random() * (Math.abs(max)); doesnt generatue negative numbers
  correct_number = Math.ceil( Math.random() * Math.abs(max) ) - Math.abs(min);
  $("#error").hide();
  $("#response").hide();
  $("#clear").attr("disabled", "disabled");
  if (min > 0) {
    $("#reset").attr("disabled", "disabled");
  }
}

function check_guess(guess) {
  if (guess < correct_number) {
    turns += 1
    return "That is too low"
  } else if (guess > correct_number) {
    turns += 1
    return "That is too high"
  } else {
    turns += 1
    var current_min = $("#min").val();
    var current_max = $("#max").val();
    $("#min").val(parseInt(current_min) - 10);
    $("#max").val(parseInt(current_max) + 10);
    $("#guess").val("")
    set_num();
    $("#error").html('It just got harder.<br>Minimum is 10 lower.<br>Maximum is 10 higher.');
    $("#error").show();
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
    // switch statements and conditionals
    console.log("validated");
    $("#response").show();
    $("#recent-guess").html(guess);
    $("#response-message").html(check_guess(guess));
    return true
  } else {
    $("#response").hide();
    $("#guess").val("")
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
  $("#min").val(1);
  $("#max").val(100);
  $("#guess").val("")
  set_num();
  $("#error").html("New Game!");
  $("#error").show();
}

function update_game() {
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

  $("#update").click(update_game);

});
