const msgEl = document.getElementById('msg');

//Generate a Random Number
function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

const randomNum = generateRandomNumber();
console.log(randomNum);

window.SpeechRecognition = 
window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture User Speech
function onSpeak(event) {
  const msg = event.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}

// Listen to and handle the speech event
recognition.addEventListener('result', onSpeak);

// See in the DOM what the user has spoken
function writeMessage(msg) {  //hmm
  msgEl.innerHTML = '';
  const div = document.createElement('div');
  div.textContent = 'You said: ';
  const span = document.createElement('span');
  span.classList.add('box');
  span.textContent = msg;

  msgEl.append(div, span);
}

//Check msg against the secret number
function checkNumber(msg) {
     const wordToNumber = {
    one: 1,
    won: 1,
    two: 2,
    to: 2,
    too: 2,
    three: 3,
    four: 4,
    for: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    ate: 8,
    nine: 9,
    ten: 10,
  };

  if (wordToNumber[msg]) {
    console.log(`adjusting ${msg} to ${wordToNumber[msg]}`);
    msg = wordToNumber[msg];
  } // Convert to number after adjustments

  const num = Number(msg);

  // Update the value of num if it's a single-digit number
 
  // Check if the spoken content is a valid number
  if (Number.isNaN(num)) {
    const div = document.createElement('div');
    div.textContent = 'That is not a valid number';
    msgEl.innerHTML = '';
    msgEl.append(div);
    return;
  }


  //check if its in range
  if (num < 1 || num > 100) {
    const div = document.createElement('div');
    div.textContent = 'Number must be between 1 and 100';
    msgEl.append(div)
    return;
  }

  //Check the number and provide feedback
  if (num === randomNum) {
    const h2 = document.createElement('h2');
    h2.textContent = `Congrats! You have guessed the number! It was ${num}`;

    const button = document.createElement('button');
    button.classList.add('play-again');
    button.id = 'play-again';
    button.textContent = 'Play Again';
    //add listener and handler to button
    button.addEventListener('click', () => window.location.reload())

    //clear out inner html of msgEl
    msgEl.innerHTML = '';
    msgEl.append(h2, button);
  } else if (num > randomNum) {
    const div = document.createElement('div');
    div.textContent = 'GO LOWER';

    msgEl.innerHTML = '';
    msgEl.append(div);
  } else {  
    const div = document.createElement('div');
    div.textContent = 'GO HIGHER';

    msgEl.innerHTML = '';
    msgEl.append(div);

  }
}

//at the end of the speech recognition serice, start it again
recognition.addEventListener('end', () => recognition.start());
