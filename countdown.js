var inputHour;
var inputMin;
var hourDiff;

var now;
var nowHour;
var nowMin;

var minDiff;

function setTimePrompts() {
    inputHour = prompt("Input hour:");
    inputMin = prompt("Input minute:");

    now = new Date();
    nowHour = now.getHours();
    nowMin = now.getMinutes();

    toggleHide('preCountdownField', false);

    console.log("time prompts set");
    DiffCamEngine.stop();
    countdown();
}

function setSnooze() {
    now = new Date();
    nowHour = now.getHours();
    nowMin = now.getMinutes();

    inputHour = nowHour;
    inputMin = nowMin + (5);

    toggleHide('preCountdownField', false);
    toggleHide('questionsField', false);

    DiffCamEngine.stop();
    countdown();
}

var x;

// Starts countdown prompts
function countdown() {
    toggleHide('countdownField', true);
    // Update the count down every 1 min (+ initial update)
    //
    x = setInterval(updateTimer, 60000 / 30);// debug
    updateTimer();
}

function updateTimer() {
    nowMin++;
    if (nowMin > 59) {
        nowHour++;
        nowMin -= 60;
    }

    if (inputHour < nowHour) {
        inputHour += 12;
    }
    hourDiff = inputHour - nowHour;

    if (inputMin < nowMin) {
        inputMin += 60;
    }
    minDiff = inputMin - nowMin;

    out(hourDiff + "h " + minDiff + "m ");

    if (hourDiff == 0 && minDiff == 0) {
        clearInterval(x);
        out("EXPIRED");

        // call alarm function
        startAlarm();
    }
}
