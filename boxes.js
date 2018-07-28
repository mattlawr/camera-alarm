var $motionBox = $('.motion-box');
var $turret = $('img');

var scale = 10;	// capture resolution over motion resolution
var isActivated = false;
var isTargetInSight = false;
var isKnockedOver = false;
var lostTimeout;

function initSuccess() {
    DiffCamEngine.start();
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
    out("active");
    //play('activated');
}

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
            right: right,
            top: top,
            width: width,
            height: height
        });

        if (!isTargetInSight) {
            isTargetInSight = true;
            console.log("SPOTTED");
            out("movement detected");
            //play('i-see-you');
        } else {
            console.log("FIRE");
            //play('fire');
        }

        clearTimeout(lostTimeout);
        lostTimeout = setTimeout(declareLost, 2000);
    }

    // video is flipped, so (0, 0) is at top right
    if (payload.checkMotionPixel(0, 0)) {
        knockOver();
    }
}

function declareLost() {
    isTargetInSight = false;

    $motionBox.css({
        border: '0px'
    });

    console.log("LOST");
    out("movement lost");
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

function play(audioId) {
    $('#audio-' + audioId)[0].play();
}
function out(s) {
    document.getElementById('output').innerHTML = s;
}

toggleHide('vidPar');// Turn off video canvas

// Start video playback
function startCamera() {
    toggleHide('vidPar');

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



function toggleHide(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}