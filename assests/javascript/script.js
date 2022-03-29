var screen0El = document.querySelector("#screen0");
var screen0BtnEl = screen0El.querySelector("#button");
var screen1El = document.querySelector("#screen1");
var screen1BtnEl = screen1El.querySelector("#button");
var screen2El = document.querySelector("#screen2");
var screen2BtnEl = screen2El.querySelector("#button");
var screen3El = document.querySelector("#screen3");
var screen3BtnEl = screen3El.querySelector("#button");
var highScoresBtnEl = document.querySelector("#HighScoresBtn");
var highScoresEl = document.querySelector("#highScoresEl");
var highScoreMsg = document.querySelector("#highScoreMsg");
var finalScoreEl = document.querySelector("#finalScore");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelector("possibleAnswers");
var initialEl = document.querySelector("#inptInit");
var timerEl = document.querySelector("#timer");
var timerTextEl = document.querySelector("#timerText");
var messageEl = document.querySelector("#message");
var timeRemaining;
var timeInt;

var HIDE_CLASS = "isHidden";

var highScoreInventory = [];

function quizGameObj(initials, score) {
    this.initials = initials;
    this.score = score;
}

var questions = [
    {
        question: " Who is the manager of the Scranton Branch of Dunder Mifflin ",
        answers: ["Andy Bernard", "Dwight Schrute", "Michael Scott", "Jim Halpert"],
        answer: 2
    },
    {
        question: " What special package does Packman leave in Michael's office? ",
        answers: ["Cake", "Stray Dogs", "Poop", "His stapler in jello"],
        answer: 2
    },
    {
        question: " What song does Michael play on his way to his new paper company? ",
        answers: ["Just Dance", "Fall for You", "Guess Who's Back", "Empire State of Mind"],
        answer: 0
    },
    {
        question: " What is Andy's nickname from college ",
        answers: ["Nard Dog", "Wicked Hammer", "Buzz", "Ace"],
        answer: 1
    },
    {
        question: " Why is Jim good at basketball? ",
        answers: ["He is 6'3", "Ball is life", "Played in College", "It was his thing in high school"],
        answer: 3
    },
    {
        question: " Why is Michael depressed and is going to jump off the roof? ",
        answers: ["Darryl said he wasn't a real man since he worked in an office", "He read about depression on WebMD", "Safety Training", "Is actually Depressed"],
        answer: 0
    },
    {
        question: " Why did Jan set up a camera in her and Michael's bedroom? ",
        answers: ["To post the video online", "To show her therapist", "For memories", "To show Michael where he needed to fix his form"],
        answer: 1
    },
    {
        question: " How big is Michael's Plasma TV? ",
        answers: ["80in", "50in", "30in", "14in"],
        answer: 3
    },
    {
        question: " What did Oscar and Kevin catch Angela doing on her nanny cam? ",
        answers: ["Sleeping with her cats", "Feeding her cats dog food", "Licking her cats clean", "Smuggling Cats"],
        answer: 2
    },
    {
        question: " Who does Michael hit with his car on the way to work? ",
        answers: ["Dwight", "Meredith", "Kevin", "Kelly"],
        answer: 1
    },
];
var currentQuestion = 0;

var dynamicElements = [
    screen0El,
    screen1El,
    screen2El,
    screen3El,
    highScoresBtnEl,
];

function init() {
    setEventListeners();
    highScoreList();
}

function storeGame() {
    localStorage.setItem("highScoreInventory", JSON.stringify(highScoreInventory));
}

function newGame() {
    currentQuestion = 0;
    currentGame = new quizGameObj("", 0);
    populateQuestion(currentQuestion);
    updateTimer();
}
function checkAnswer(currentQuestion, answerID) {
    console.log("answerID:" + answerID);
    console.log("answer object:");
    console.log(questions[currentQuestion]['answer']);
    if (answerID == questions[currentQuestion]['answer']) {
        right(true);
    } else {
        right(false);
    }
}

function right(right) {
    if (right) {
        console.log("Before score: " + currentGame["score"])
        currentGame["score"]++
        console.log("After score: " + currentGame["score"])
        displayMessage("Right");
    } else {
        currentGame["score"]--
        displayMessage("Wrong");
        timeRemaining = timeRemaining - 5
    }
}

function displayMessage(message) {
    switch (message) {
        case "right":
            messageEl.textContent = "Great Job Jimbo";
            break;
        case "wrong":
            messageEl.textContent = "No God, Please NO!";
            break;
        case "noHigh":
            highScoreMsg.textContent = "Do you deserve to win the Dundie award?";
            highScoreMsg.classList.remove(HIDE_CLASS);
            break;
        case "high":
            highScoreMsg.classList.add(HIDE_CLASS);
            break;
    }
}

function setState(state) {
    console.log("State: " + state)
    switch (state) {
        case 1:
            newGame();
            break;
        case 2:
            setFinalScore()
            break;
        case 3:
            highScoreList();
            break;
        default:
            break;
    }

    dynamicElements.forEach(function (ele) {
        var possibleStatesAttr = ele.getAttribute("data-states");
        var possibleStates = JSON.parse(possibleStatesAttr);
        if (possibleStates.includes(state)) {
            ele.classList.remove(HIDE_CLASS);
        } else {
            ele.classList.add(HIDE_CLASS);
        }
    });
}

function populateQuestion() {
    var questionObj = questions[currentQuestion];
    answersEl.innerHTML = "";
    questionsEl.textContent = questionObj.question;
    for (i = 0; i < questionObj.answers.length; i++) {
        var answer = questionObj.answers[i];
        var li = document.createElement("li");
        li.setAttribute("data-index",i);
        li.textContent = answer;
        answersEl.appendChild(li);
    };
}

function setFinalScore() {
    finalScoreEl.textContent = currentGame.score;
}

function setInitials(finalScore) {
    currentGame["initials"] = initialEl.value;
    finalScore = currentGame["score"];
    highScoreInventory.push(currentGame);
    storeGame();
}

function highScoreList() {
    highScoreInventory = JSON.parse(localStorage.getItem("highScoreInventory"));

    highScoresEl.innerHTML = ""
    var tbl = document.createElement("table");
    var tblh = document.createElement("thead")
    var tblBody = document.createElement("tbody");
    var c, r
    r = tbl.insertRow(0);
    c = r.insertCell(0);
    c.innerHTML = "<h2>Initials</h2>";
    c = r.insertCell(1);
    c.innerHTML = "<h2>Score</h2>"
    if (highScoreInventory !== null) {
        console.log("High Scores Present")
        displayMessage("high");
        highScoreInventory.forEach(function (gameobj, index) {
            console.log("[" + index + "]: " + gameobj.initials);
            var c, r
            r = tbl.insertRow(index + 1);
            c = r.insertCell(0);
            c.innerHTML = gameobj.initials
            c = r.insertCell(1);
            c.innerHTML = gameobj.score
            highScoresEl.appendChild(tbl);
        });
    } else {
        console.log("No High Scores Present")
        displayMessage("noHigh");
        highScoreInventory = [];
    }
}

const updateTimer = () => {
    timeRemaining = 45;
    timeInt = setInterval(() => {
        currentGame["score"] = timeRemaining;
        if (timeRemaining > 1) {
            timerEl.textContent = timeRemaining + "seconds remaining";
            timeRemaining--;
        } else if (timeRemaining === 1) {
            timerEl.textContent = timeRemaining + " second remaining";
            timeRemaining--;
        } else {
            timerEl.textContent = "";
            clearInterval(timeInt);
            setState(2);
        }
    }, 1000);
}

function setEventListeners() {
    screen0BtnEl.addEventListener("click", function () {
        setState(1);
    });
    screen2BtnEl.addEventListener("click", function () {
        setState(3);
    });
    highScoresBtnEl.addEventListener("click", function () {
        setState(3);
    });
    screen3BtnEl.addEventListener("click", function () {
        setState(0);
    });
    answersEl.addEventListener("click", function (evt) {
        var target = evt.target;
        if (target.matches("li")) {
            checkAnswer(currentQuestion, target.getAttribute("data-index"));
            if (currentQuestion === questions.length - 1) {
                console.log("Game Ended");
                clearInterval(timeInt);
                setState(2);
            } else {
                currentQuestion++;
                populateQuestion(currentQuestion)
            }
        }
    });
}
init();