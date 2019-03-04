var turns = 0

function set_num() {
  turns = 0
  min = $("#min").val();
  // sets maximum of range
  max = $("#max").val();
  // correct_number = Math.ceil(Math.random() * (Math.abs(max)); doesnt generatue negative numbers
  correct_number = Math.ceil( Math.random() * Math.abs(max) ) - Math.abs(min);
  $("#error").hide();
  $("#response").hide();
  // disables clear button
  $("#clear").attr("disabled", "disabled");
  // disables reset button only if its a new game, if the min is lower than 0 then you know the user is "continuing" after guessing right.
  if (min > 0) {
    $("#reset").attr("disabled", "disabled");
  }
}

// checks to see if guess is correct and provides feedback if not
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
    // clear guess input field
    $("#guess").val("")
    // set min-max, pick new number on new range, hide errors and messages and disable unneccessary buttons
    set_num();
    $("#error").html(`That took you ${turns} turns.<br>It just got harder.<br>Minimum is 10 lower.<br>Maximum is 10 higher.`);
    $("#error").show();
    // win message
    return "BOOM!"
  }
}


// guess validation
function validate_guess(guess) {
  // turn gues into integer for validations
  var guess_num = parseInt(guess);
  //if the guess isnt an integer send an error
  if (isNaN(guess_num)) {
    $("#error").html("That's not a number, try again.");
    return false
  // if guess is outsite range, send an error
  } else if (guess_num > max || guess_num < min) {
    $("#error").html("That's outside our range, try again.");
    return false
  // if all else fails must be a valid guess
  } else {
    return true
  }
}

// takes in guess and figures out what to do with it
function submit_guess() {
  // remove errors and messages
  $("#error").hide();
  // enable clear and reset buttons
  $("#clear").attr("disabled", null);
  $("#reset").attr("disabled", null);
  // store users guess
  var guess = $("#guess").val();
  // validate guess
  if (validate_guess(guess)) {
    $("#response").show();
    $("#recent-guess").html(guess);
    $("#response-message").html(check_guess(guess));
    return true
  } else {
    // if bad, clear guess field and show error message
    $("#response").hide();
    $("#guess").val("")
    $("#error").show();
    return false
  }
}

// clears the guess field
function clear_guess() {
  // hide old responses and errors
  $("#error").hide();
  $("#response").hide();
  // clear guess field
  $("#guess").val("")
  // disable clear button, what's there to clear?
  $("#clear").attr("disabled", "disabled");
}

// restart game with default settings
function reset_game() {
  // set min-max to defaults
  $("#min").val(1);
  $("#max").val(100);
  // clear guess field
  $("#guess").val("");
  // set new number from default range
  set_num();
  // tell user they've started a new game
  $("#error").html("New Game!");
  $("#error").show();
}

// allows users to set their own range
function update_game() {
  // remove old guess
  $("#guess").val("")
  // set new number from new range
  set_num();
  // tell user its a new game
  $("#error").html("New Game!");
  $("#error").show();
}

// when the page loads set number from default range
window.onload = set_num;

// user interactions
$(document).ready( function() {

  // user submits a guess for feedback
  $("#submit").click(submit_guess);

  // user wants to clear their current guess
  $("#clear").click(clear_guess);

  // user wants to reset the game to defaults
  $("#reset").click(reset_game);

  // user wants to set their own range
  $("#update").click(update_game);

});
