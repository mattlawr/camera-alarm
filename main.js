var $motionBox = $('.motion-box');
var $turret = $('img');

var scale = 10;	// capture resolution over motion resolution
var isActivated = false;
var isTargetInSight = false;
var isKnockedOver = false;
var lostTimeout;

var motionCounter = 0;
var alarming = false;

// A bunch of cam-engine stuff ---
function initSuccess() {
    DiffCamEngine.start();
    console.log("STARTING");
}

function initError() {
    alert('Something went wrong.');
}

function startComplete() {
    setTimeout(activate, 500);
}

function activate() {
    isActivated = true;
    console.log("active...");
    //out("active");
    //play('activated');
}

// "called when an image has been captured and diffed"
function capture(payload) {
    if (!isActivated || isKnockedOver) {
        return;
    }

    var box = payload.motionBox;
    if (box) {
        // video is flipped, so we're positioning from right instead of left
        var right = box.x.min * scale + 1;
        var top = box.y.min * scale + 1;
        var width = (box.x.max - box.x.min) * scale;
        var height = (box.y.max - box.y.min) * scale;

        $motionBox.css({
            display: 'block',
            border: '4px solid #fff',
            right: right * 0.625,
            top: top * 0.625,
            width: width*0.625,
            height: height*0.625
        });

        if (!isTargetInSight) {
            isTargetInSight = true;
            console.log("SPOTTED");
            
            //play('i-see-you');
        } else {
            console.log("MOTION " + motionCounter + " SCORE: " + payload.score);

            motionCounter += payload.score / 10;

            //document.getElementById("main").style.background = 

            //play('fire');
        }
        motionCounter--;

        if (motionCounter >= 1000 && alarming) {// MOTION
            declareLost();
            snoozeAlarm();
        }

        clearTimeout(lostTimeout);
        lostTimeout = setTimeout(declareLost, 500);// 1s timeout
    }

    // video is flipped, so (0, 0) is at top right
    /*if (payload.checkMotionPixel(0, 0)) {
        knockOver();
    }*/
}

function declareLost() {
    isTargetInSight = false;

    $motionBox.css({
        border: '0px'
    });

    console.log("LOST TARGET");

    motionCounter = 0;
    
    //play('target-lost');
}

function knockOver() {
    isKnockedOver = true;
    clearTimeout(lostTimeout);

    $turret.addClass('knocked-over');
    $motionBox.hide();

    console.log("OW");
    //play('ow');
}
// ---


function play(audioId) {
    $('#audio-' + audioId)[0].play();
}
function stop(audioId) {
    $('#audio-' + audioId)[0].pause();
    $('#audio-' + audioId)[0].currentTime = 0;
}
function out(s) {
    document.getElementById('output').innerHTML = s;
}

/*var incrementColor = function (color, step) {
    var colorToInt = parseInt(color.substr(1), 16),                     // Convert HEX color to integer
        nstep = parseInt(step);                                         // Convert step to integer
    if (!isNaN(colorToInt) && !isNaN(nstep)) {                            // Make sure that color has been converted to integer
        colorToInt += nstep;                                            // Increment integer with step
        var ncolor = colorToInt.toString(16);                           // Convert back integer to HEX
        ncolor = '#' + (new Array(7 - ncolor.length).join(0)) + ncolor;   // Left pad "0" to make HEX look like a color
        if (/^#[0-9a-f]{6}$/i.test(ncolor)) {                             // Make sure that HEX is a valid color
            return ncolor;
        }
    }
    return color;
};*/

startCamera();
toggleHide('videoField', false);// Turn off video canvas on start
toggleHide('countdownField', false);// Turn off countdown on start
toggleHide('cancelField', false);
toggleHide('questionsField', false);

// Start video playback
function startAlarm() {
    toggleHide('countdownField', false);// Hide countdown
    toggleHide('videoField', true);// Show video feed

    play('90s');// Add random song functionality

    toggleHide('questionsField', true);// Show questions to answer ***
    toggleHide('cancelField', false);

    genQuestion();// ***

    //var task = window.setInterval(flash,1000);//flashes screen

    alarming = true;

    DiffCamEngine.start();
}

function stopFlash(){
    clearInterval(task);//stops flashing
}

// Start video playback
function startCamera() {
    DiffCamEngine.init({
        video: document.getElementById('video'),
        captureIntervalTime: 50,
        includeMotionBox: true,
        includeMotionPixels: true,
        initSuccessCallback: initSuccess,
        initErrorCallback: initError,
        startCompleteCallback: startComplete,
        captureCallback: capture
    });
}

function snoozeAlarm() {
    stop('90s');

    toggleHide('videoField', false);// Hide video feed


    setSnooze();
    alarming = false;
}

function endAlarmProgram() {
    stop('90s');
    toggleHide('videoField', false);// Hide video feed
    toggleHide('countdownField', false);// Turn off countdown on start
    toggleHide('questionsField', false);
    toggleHide('cancelField', false);
    alarming = false;

    console.log("alarm seq ended...")

    clearInterval(x);

    DiffCamEngine.stop();
}
//

function toggleHide(id, visible) {
    var x = document.getElementById(id);
    if (x == null) { console.error("ERROR WITH ID: " + id); }

    if (visible) {
        x.style.display = "block";// SHOW
    } else {
        x.style.display = "none";// HIDE
    }
}
