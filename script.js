
/////// DOM ELEMENTS ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

let userInput = document.getElementsByTagName('input')[0]
let hangmanImg = document.getElementById('hangmanImg')
let wrongGuessDiv = document.getElementById('wrongGuessDiv')
let lettersDiv = document.getElementById('lettersDiv')



/////// GLOBAL VARIABLES ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

let userMisses = 0
let wrongGuess = null

let correctIndexes = []
let textToDisplay = []

let answersArray = ["renovation", "astronomical", "complicated", "tumultuous",]
let answersShuffled = null
let answerString = null

let round = 0



/////// USER INPUT EVENT ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

userInput.addEventListener("keypress", function (e) {

  if (e.keyCode == 13) {
    e.preventDefault()

    // if user input is 1 letter, run check and update functions
    if (this.value.length <= 1) {
        checkGuess(this.value.toLowerCase())
        updateHangman()
        displayWrongs()
        displayText(textToDisplay)
        checkWin()
        checkLose()
    // else alert
    } else if (this.value.length > 1) {
        alert("Your answer must be one letter.")
    }

  // reset input feild to blank
  this.value = ""

  }

})



/////// SET STATE ON WINDOW LOAD ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////

window.onload = () => {

  // set shuffle answers array
  answersShuffled = shuffleArray(answersArray)
  console.log(answersShuffled)

  // start new game
  startNew()

}



/////// START NEW FUNCTION /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function startNew () {

  // reset answer text display
  textToDisplay = []

  // reset wrong guesses display
  while (wrongGuessDiv.firstChild) {
    wrongGuessDiv.removeChild(wrongGuessDiv.firstChild);
  }

  // reset hangman
  hangmanImg.removeAttribute("src")

  // reset misses
  userMisses = 0

  // set answer to next index of shuffled array
  answerString = answersShuffled[round]
  console.log(answerString)

  // for all letters in the answer, set display array to underscore
  for (i = 0; i < answerString.length; i++) {
    textToDisplay.push("_")
  }

  // display the underscores array
  displayText(textToDisplay)

}



/////// DISPLAY TEXT FUNCTION //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function displayText (textArray) {

  // clear lettersDiv of all elements
  while (lettersDiv.firstChild) {
    lettersDiv.removeChild(lettersDiv.firstChild);
  }

  // create a <p> for each index of array and add it to lettersDiv
  textArray.forEach( (char)=> {
    let newChar = document.createElement('p')
    newChar.innerHTML = char
    lettersDiv.appendChild(newChar)
  })
}



/////// DISPLAY WRONG GUESSES FUNCTION /////////////////////////////////
////////////////////////////////////////////////////////////////////////

function displayWrongs () {

  // create a <p> with wrongGuess and add it to wrongGuessDiv
  let wrongLetter = document.createElement('p')
  wrongLetter.innerHTML = wrongGuess
  wrongGuessDiv.appendChild(wrongLetter)

  // reset wrongGuess
  wrongGuess = null

}



/////// CHECK GUESS FUNCTION ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function checkGuess (letter) {

  // number of times the letter was identified
  let letterIdentified = 0

  // for every match of letter, add that index to correctIndexes
  for (i = 0; i < answerString.length; i++) {
    if (answerString.charAt(i) == letter) {
      correctIndexes.push(i)
      letterIdentified += 1
      // add letter to textToDisplay at matched index
      addCorrectLetter(letter)
    }
  }

  // if letter was never identified
  if (letterIdentified == 0) {
    wrongGuess = letter
    userMisses += 1
  }

  // reset the index of matched letters
  correctIndexes = []

}



/////// ADD CORRECT LETTER FUNCTION ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function addCorrectLetter (l) {

  /// add letter to textToDisplay at matched index
  for (i = 0; i < correctIndexes.length; i++) {
    textToDisplay[ correctIndexes[i] ] = l
  }

}



/////// CHECK WIN FUNCTION /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function checkWin () {

  // if word is complete
  if (textToDisplay.join('') == answerString) {

    round += 1

    // allow time for final letter to display
    setTimeout ( ()=> {

      // if no more words in array
      if (round >= answersArray.length) {
        alert("That's it! Thanks for playing! \n\n\t Click to play again. ")
        window.location.href = "index.html"
      // else if there are more words in array
      } else {
        alert("Great job! Click to continue")
        startNew()
      }

    }, 20 )

  }

}


/////// CHECK LOSE FUNCTION ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function checkLose () {

  // if Misses are max
  if (userMisses == 6) {

    // allow time for hangman to update
    setTimeout ( ()=> {
      alert("You Lose!")
      window.location.href = "index.html"
    }, 20)

  }

}



/////// UPDATE HANGMAN FUNCTION ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function updateHangman () {
  if (userMisses == 1) {
      hangmanImg.setAttribute("src", "./hangmanHead.png")
  } else if (userMisses == 2) {
      hangmanImg.setAttribute("src", "./hangmanBody.png")
  } else if (userMisses == 3) {
      hangmanImg.setAttribute("src", "./hangmanArm1.png")
  } else if (userMisses == 4) {
      hangmanImg.setAttribute("src", "./hangmanArm2.png")
  } else if (userMisses == 5) {
      hangmanImg.setAttribute("src", "./hangmanLeg1.png")
  } else if (userMisses == 6) {
      hangmanImg.setAttribute("src", "./hangmanLeg2.png")
  }
}



/////// SHUFFLE ARRAY FUNCTION /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function shuffleArray(ary) {

    for (let i = ary.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ary[i], ary[j]] = [ary[j], ary[i]];
    }

    return ary;

}




// end //////////////////////////////////////////////////////////////////
