var video = document.getElementById('video');
var canvas = document.getElementById('motion');
var score = document.getElementById('score');

function initSuccess() {
    DiffCamEngine.start();
}

function initError() {
    alert('Something went wrong.');
}

function capture(payload) {
    score.textContent = payload.score;
}
//code for text-to-speech
/*
ex:
var tts = new SpeechSynthesisUtterance('Example');
window.speechSynthesis.speak(tts);
tts.volume = 1;
tts.rate = 1;  //can be between 0.1 - 10
tts.text = 'Example';

tts.onend = function(e) {
    console.log('Finished in ' + event.elapsedTime + 'seconds.');
}
*/

DiffCamEngine.init({
    video: video,
    motionCanvas: canvas,
    initSuccessCallback: initSuccess,
    initErrorCallback: initError,
    captureCallback: capture
});
