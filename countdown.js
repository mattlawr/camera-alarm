var inputHour;
var inputMin;
var input;
var hourDiff;

var now;
var nowHour;
var nowMin;

var minDiff;

function setTimePrompts() {
    inputHour = prompt("Input hour:");
    inputMin = prompt("Input minute:");
    input = new Date();
    input.setHours(inputHour);
    input.setMinutes(inputMin);

    now = new Date();
    nowHour = now.getHours();
    nowMin = now.getMinutes();

    toggleHide('preCountdownField', false);
    toggleHide('cancelField', true);

    console.log("time prompts set");
    DiffCamEngine.stop();
    countdown();
}

function setSnooze() {
    now = new Date();
    nowHour = now.getHours();
    nowMin = now.getMinutes();


    input = new Date();
    input.setHours(nowHour);
    input.setMinutes(nowMin +5);

    toggleHide('preCountdownField', false);
    toggleHide('questionsField', true);

    DiffCamEngine.stop();
    countdown();
}

var x;

// Starts countdown prompts//
function countdown() {
    toggleHide('countdownField', true);
    // Update the count down every 1 min (+ initial update)
    //
    x = setInterval(updateTimer, 60000/30);// debug
    updateTimer();
}

function updateTimer() {
    now = new Date();
    if(input.getTime() < now.getTime()){
	input.setTime(input.getTime() + 86400000);
    }
    hourDiff = Math.floor((input.getTime() - now.getTime())/3600000);
    minDiff = Math.round((input.getTime() - now.getTime())%3600000/60000);

    out(hourDiff + "h " + minDiff + "m ");

    if (hourDiff == 0 && minDiff == 0) {
        clearInterval(x);
        out("EXPIRED");

        // call alarm function
        startAlarm();
    }
}
