
$(document).ready(function(){
	
	/*--- variable declarations ---*/
	var randomNumber;
	var guessFlag;
	var guessCount;
	var userChoice;
	var found = false;

	/*--- create new game ---*/
	newGame();


	/*--- user submit --*/
	$("form").submit(function(event){

		event.preventDefault();

   

		if (!found) {
			userChoice = $('#userGuess').val();
			console.log("User choice =" + userChoice);
			clearText();
			setFocus();
			guessFlag = checkChoice(userChoice);
			if (!guessFlag) {
				guessCount++;
				setCount(guessCount);
				$('ul#guessList').append("<li>" + userChoice + "</li>");
				guessFlag = checkTemperature(Math.abs(randomNumber - userChoice));
			};
		} else {
			setFeedback("You win! Start a new game to play again.");
		
		};
	});


	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	/*--- create new game on click ---*/
  	function newGame() {
  		guessFlag = true;
  		guessCount = 0;
  		found = false;
  		$('ul.guessList li').remove();
  		setFeedback("Make your guess!");
  		setCount(guessCount);
  		randomNumber = generateNumber();
  		setFocus();
  		clearText();
      console.log("new game started");
  	}

  	/*--- generate a random number ---*/
  	function generateNumber() {

  		var generatedNumber = Math.floor((Math.random() * 100) + 1);
  		console.log("Generated random number");
  		
  		return generatedNumber;
  	}

  	/*--- set the focus to the input box ---*/
	function setFocus(){
  		document.getElementById("userGuess").focus();
      console.log("set the focus");
  }

 	/*-- clear the text box --*/
  	function clearText() {
  		$('#userGuess').val('');
  	}

  	/*--- set the guess count ---*/
  	function setCount(count) {
  		$('#count').text(guessCount);
      console.log("set the guess count");
  	}
  	
  	/*-- prompt for the user's guess --*/
  	function getChoice() {
  		var userChoice = prompt("Guess the number","Your guess")
  		console.log("User Choice =" + userChoice);
  		return userChoice;
	  }	
  	/*--- Checks if the users guess meets the rules --*/
  	function checkChoice(userChoice) {
  		if (isNaN(userChoice)) {
  			setFeedback("No luck! Try a whole number between 1 and 100.");
  			return true;
  		} else if (userChoice < 1 || userChoice > 100) {
  			setFeedback("Sorry! the number has to be between 1 and 100.");
  			return true;
  		} else if ($.trim(userChoice) == '') {
  			setFeedback('Please enter your guess!');
  			return true;
  		} else {
  			return false;
  		};
  	}

  	/*--- Check the temperature for feedback ---*/
  	function checkTemperature(guessDifference) {
  		if (guessDifference == 0) {
  			setFeedback("Sweet! You've got it!");
  			found = true;
  			return false;
  		} else if (guessDifference <= 5) {
  			setFeedback("Your guess is an inferno! Hot hot hot!");
  			return true;
  		} else if (guessDifference <=10) {
  			setFeedback("You're getting hot!");
  			return true;
  		} else if (guessDifference <=20) {	
  			setFeedback("You are warming up!");
  			return true;
  		} else if (guessDifference <=30) {
  			setFeedback("Your guess is cold.");
  			return true;
  		} else if ( guessDifference <=40) {
  			setFeedback("Your guess is shivering because it is very cold.");
  			return true;
  		} else if (guessDifference <=50) {
  			setFeedback("Frigid. Your guess brought on an ice age. Thanks.");
  			return true;
  		};
  	}

  	/*--- Set the feedback ---*/
  	function setFeedback(feedback) {
  		$('#feedback').text(feedback);
  	}

});


