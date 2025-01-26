document.addEventListener("DOMContentLoaded", async () => {
    const playerName = localStorage.getItem("playerName");
    let questionArray;

    // Load the appropriate question set based on the player's name
    if (playerName && playerName.toLowerCase() === "pushkar" || "batman") {
        questionArray = (await import("/Game/batman.js")).questionArray;
    } else if (playerName && playerName.toLowerCase() === "medicial") {
        questionArray = (await import("/Game/medicial.js")).questionArray;
    } else {
        questionArray = (await import("/Game/question.js")).questionArray;
    }

    // Initialize the game only if questionArray is loaded
    if (questionArray) {
        currentque(questionArray);
        checkAnswer(questionArray);
    } else {
        alert("Error loading questions. Please try again.");
    }
});



const time = document.querySelector("#time");
const question = document.querySelector("#question");
const ansButton = document.querySelectorAll(".ansButton");
const prize = document.querySelector("#prize");
const questionNo = document.querySelector("#questionNo");

// Game Variables
let prizePool = 0;
let questionNumer = 1;
let qnoIndex = 0;
let interval;

// Timer Function
const timmerFun = (sec) => {
    let timeleft = sec;
    interval = setInterval(() => {
        if (timeleft > 0) {
            timeleft--;
            time.innerText = timeleft;
        } else {
            clearInterval(interval);
            alert("Time's up! Game over!");
            showLeaderboard();
        }
    }, 1000);
};

// Display Current Question
// Display Current Question
const currentque = (questionArray) => {
    question.innerText = questionArray[qnoIndex].question;
    ansButton.forEach((btn, idx) => {
        btn.innerText = questionArray[qnoIndex].options[idx];
    });
    timmerFun(60);
};

// Check Answer
const checkAnswer = (questionArray) => {
    ansButton.forEach((btn) => {
        btn.onclick = () => {
            clearInterval(interval);
            if (Number(btn.id) === questionArray[qnoIndex].answer) {
                prizePool += 1000;
                prize.innerText = prizePool;
                questionNumer++;
                questionNo.innerText = questionNumer;
                qnoIndex++;
                if (qnoIndex < questionArray.length) {
                    currentque(questionArray);
                } else {
                    showLeaderboard();
                }
            } else {
                alert("Wrong answer! Game over!");
                showLeaderboard();
            }
        };
    });
};


// Show Leaderboard
const showLeaderboard = () => {
    alert(`Game Over! Your total prize: ₹${prizePool}`);
};

// Initialize Game on DOM Load
document.addEventListener("DOMContentLoaded", () => {
    currentque();
    checkAnswer();
});
