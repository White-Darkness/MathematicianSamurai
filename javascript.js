var playing = false;
var score;
var timeRemaining;
var correctAnswer;
var counter;
var startTime;

const startResetBtn = document.getElementById("startreset");
const scoreValue = document.getElementById("scorevalue");
const timer = document.getElementById("timeremaining");
const timerValue = document.getElementById("timeremainingvalue");
const gameOverBox = document.getElementById("gameover");
const questionBox = document.getElementById("question");
const correctBox = document.getElementById("correct");
const wrongBox = document.getElementById("wrong");
const boxes = [1, 2, 3, 4].map((i) => document.getElementById("box" + i));

startResetBtn.onclick = function () {
    if (playing) {
        location.reload();
    } else {
        playing = true;
        score = 0;
        hide(gameOverBox);
        scoreValue.innerHTML = score;

        show(timer);
        timeRemaining = 60;
        timerValue.innerHTML = timeRemaining;

        startResetBtn.innerHTML = "Reset Game";
        startCountdown();
        generateQA();
    }
};

boxes.forEach((box) => {
    box.onclick = function () {
        if (playing) {
            if (parseInt(this.innerHTML) === correctAnswer) {
                score++;
                scoreValue.innerHTML = score;
                showFeedback(true);
                setTimeout(() => hide(correctBox), 500);
                generateQA();
            } else {
                showFeedback(false);
                setTimeout(() => hide(wrongBox), 500);
            }
        }
    };
});

function startCountdown() {
    startTime = Date.now();

    function countdown() {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const timeLeft = timeRemaining - elapsed;

        if (timeLeft > 0) {
            timerValue.innerHTML = timeLeft;
            requestAnimationFrame(countdown);
        } else {
            stopGame();
        }
    }

    requestAnimationFrame(countdown);
}

function stopGame() {
    playing = false;
    show(gameOverBox);
    gameOverBox.innerHTML = `<p>Game Over!</p> <p>Your Score is ${score}.</p>`;
    hide(timer);
    hide(correctBox);
    hide(wrongBox);
    startResetBtn.innerHTML = "Start Game";
}

function generateQA() {
    let x, y, operator, correctExpression;

    x = 1 + Math.floor(Math.random() * 9);
    y = 1 + Math.floor(Math.random() * 9);
    operator = ["+", "-", "x", "÷"][Math.floor(Math.random() * 4)];

    switch (operator) {
        case "+":
            correctAnswer = x + y;
            correctExpression = `${x} + ${y}`;
            break;
        case "-":
            correctAnswer = x - y;
            correctExpression = `${x} - ${y}`;
            break;
        case "x":
            correctAnswer = x * y;
            correctExpression = `${x} × ${y}`;
            break;
        case "÷":
            correctAnswer = Math.floor((x * y) / y);
            correctExpression = `${x * y} ÷ ${y}`;
            break;
    }

    questionBox.innerHTML = correctExpression;

    const correctPosition = 1 + Math.floor(Math.random() * 4);
    boxes[correctPosition - 1].innerHTML = correctAnswer;

    const answers = [correctAnswer];
    boxes.forEach((box, index) => {
        if (index !== correctPosition - 1) {
            let wrongAnswer;
            do {
                const wrongX = 1 + Math.floor(Math.random() * 9);
                const wrongY = 1 + Math.floor(Math.random() * 9);
                const wrongOperator = ["+", "-", "x", "÷"][Math.floor(Math.random() * 4)];

                switch (wrongOperator) {
                    case "+":
                        wrongAnswer = wrongX + wrongY;
                        break;
                    case "-":
                        wrongAnswer = wrongX - wrongY;
                        break;
                    case "x":
                        wrongAnswer = wrongX * wrongY;
                        break;
                    case "÷":
                        wrongAnswer = Math.floor((wrongX * wrongY) / wrongY);
                        break;
                }
            } while (answers.includes(wrongAnswer));
            box.innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    });
}

function showFeedback(isCorrect) {
    const correctMessage = document.getElementById("correct");
    const wrongMessage = document.getElementById("wrong");

    // Hide both messages initially
    correctMessage.style.display = "none";
    wrongMessage.style.display = "none";

    // Show the correct or wrong message based on the answer
    if (isCorrect) {
        correctMessage.style.display = "block";  // Show correct message
    } else {
        wrongMessage.style.display = "block";  // Show wrong message
    }

    // Hide the message after 1.5 seconds
    setTimeout(function() {
        correctMessage.style.display = "none";
        wrongMessage.style.display = "none";
    }, 1500);  // 1.5 seconds delay
}

function hide(element) {
    element.style.display = "none";
}

function show(element) {
    element.style.display = "block";
}
