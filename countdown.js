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

    if (inputHour < nowHour) {
        inputHour += 12;
    }
    hourDiff = inputHour - nowHour;

    if (inputMin < nowMin) {
        inputMin += 60;
    }
    minDiff = inputMin - nowMin;

    document.getElementById("output").innerHTML = hourDiff + "h " + minDiff + "m ";
    toggleHide('preCountdownField', false);

    DiffCamEngine.stop();
    countdown();
}

// Starts countdown prompts
function countdown() {
    toggleHide('countdownField', true);
    // Update the count down every 1 min
    var x = setInterval(function () {
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

        document.getElementById("output").innerHTML = hourDiff + "h " + minDiff + "m ";

        if (hourDiff == 0 && minDiff == 0) {
            clearInterval(x);
            document.getElementById("output").innerHTML = "EXPIRED";

            // call alarm function
            startAlarm();
        }
    }, 60000/30);// debug
}
