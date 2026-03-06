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
    console.log(event);
    const msg= event.results[0][0].transcript;

    console.log(msg);
}

// Listen to and handle the speech event
recognition.addEventListener('result', onSpeak);

