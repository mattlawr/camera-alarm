var questionType = Math.floor((Math.random() * 3) + 1);
var randomNum1 = Math.floor((Math.random() * 20) + 1);
var randomNum2 = Math.floor((Math.random() * 20) + 1);
var randomMult1 = Math.floor((Math.random() * 12) + 1);
var randomMult2 = Math.floor((Math.random() * 12) + 1);
var answer = 0;
var userAnswer = 0;
var questionAmount = 0; 

function question(questionType) {
    //ADDITION
    if (questionType == 1) {
        document.getElementById("questionText").innerHTML = "Question: " + randomNum1 + " + " + randomNum2;
        answer = randomNum1 + randomNum2;
    }
    //SUBTRACTION
    else if (questionType == 2) {
        if (randomNum1 > randomNum2) {
            document.getElementById("questionText").innerHTML = "Question: " + randomNum1 + " - " + randomNum2;
            answer = randomNum1 - randomNum2;
        }
        else if (randomNum1 < randomNum2) {
            document.getElementById("questionText").innerHTML = "Question: " + randomNum2 + " - " + randomNum1;
            answer = randomNum2 - randomNum1;
        }
        else if (randomNum1 == randomNum2) {
            randomNum1 += Math.floor((Math.random() * 10) + 1);
            document.getElementById("questionText").innerHTML = "Question: " + randomNum1 + " - " + randomNum2;
            answer = randomNum1 - randomNum2;
        }
    }
    //MULTIPLICATION
    else if (questionType == 3) {
        document.getElementById("questionText").innerHTML = "Question: " + randomMult1 + " * " + randomMult2;
        answer = randomMult1 * randomMult2;
    }
}

function genQuestion() {
    question(questionType);
    console.log(questionType);
    console.log(randomNum1);
    console.log(randomNum2);
    console.log(answer);
}

function checkAnswer() {
    userAnswer = document.getElementById("userAnswer").value;
    if (userAnswer == answer) {
        document.getElementById("greetingText").innerHTML = "Correct!";
        questionAmount++;
        if (questionAmount == 3) {
            endAlarmProgram();
        }

    }
    else {
        document.getElementById("greetingText").innerHTML = "Incorrect!";
    }
}
