import "./styles.css";
let startTimer = 10;
var screen0El = document.querySelector("#screen0");
var screen0BtnEl = screen0El.querySelector("#button")
var screen1El = document.querySelector("#screen1");
var screen1BtnEl = screen1El.querySelector("#button");
var screen2El = document.querySelector("#screen2");
var screen2BtnEl = screen2El.querySelector("#button");
var doSomethingEl = document.querySelector("#doSomething");
var saySomethingEl = document.querySelector("#saySomething");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelector("possibleAnswers");

var HIDE_CLASS = "isHidden";
var questions = [
    {
        question: " Who is the manager of the Scranton Branch of Dunder Mifflin ",
        answers: ["Andy Bernard", "Dwight Schrute", "Michael Scott", "Jim Halpert"],
        answer: 0
    },
    {
        question: " What special package does Packman leave in Michael's office? ",
        answers: ["Cake", "Stray Dogs", "Poop", "His stapler in jello"],
        answer: 0
    },
    {
        question: " What song does Michael play on his way to his new paper company? ",
        answers: ["Just Dance", "Fall for You", "Guess Who's Back", "Empire State of Mind"],
        answer: 0
    },
    {
        question: " What is Andy's nickname from college ",
        answers: ["Nard Dog", "Wicked Hammer", "Buzz", "Ace"],
        answer: 0
    },
    {
        question: " Why is Jim good at basketball? ",
        answers: ["He is 6'3", "Ball is life", "Played in College", "It was his thing in high school"],
        answer: 0
    },
    {
        question: " Why is Michael depressed and is going to jump off the roof? ",
        answers: ["Darryl said he wasn't a real man since he worked in an office", "He read about depression on WebMD", "Safety Training", "Is actually Depressed"],
        answer: 0
    },
    {
        question: " Why did Jan set up a camera in her and Michael's bedroom? ",
        answers: ["To post the video online", "To show her therapist", "For memories", "To show Michael where he needed to fix his form"],
        answer: 0
    },
    {
        question: " How big is Michael's Plasma TV? ",
        answers: ["80in", "50in", "30in", "14in"],
        answer: 0
    },
    {
        question: " What did Oscar and Kevin catch Angela doing on her nanny cam? ",
        answers: ["Sleeping with her cats", "Feeding her cats dog food", "Licking her cats clean", "Smuggling Cats"],
        answer: 0
    },
    {
        question: " Who does Michael hit with his car on the way to work? ",
        answers: ["Dwight", "Meredith", "Kevin", "Kelly"],
        answer: 0
    },
];
var currentQuestion = 0;

var dynamicElements = [
    screen0El,
    screen1El,
    screen2El,
    doSomethingEl,
    saySomethingEl,
];

function init() {
    setEventListeners();
}

function setState(state) {
    switch (state) {
        case 1:
            populateQuestion();
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
    //remove the current list items
    answersEl.innerHTML= "";
    questionsEl.textContent = questionObj.question;
    questionObj.answers.forEach(function (question) {
        var li = document.createElement("li");
        li.textContent = question;
        answersEl.appendChild(li);
    });
    if (currentQuestion === questions.length - 1) {
        currentQuestion = 0;
    } else {
        currentQuestion++;
    }
}

function setEventListeners() {
    screen0BtnEl.addEventListener("click", function() {
        setState(1);
    });
    screen1BtnEl.addEventListener("click", function() {
        setState(2);
    });
    screen2BtnEl.addEventListener("click", function() {
        setState(0);
    });
    answersEl.addEventListener("click", function (evt) {
        var target = evt.target;
        if (target.matches("li")) {
            window.alert(target.innerText);
        }
    })
}

init();
const updateTimer = () =>{
    setInterval(()=>{
        let timer = document.getElementById('timer');
        //putting content of the start timer var in div tag with ID of timer
        timer.innerHTML = startTimer;
        startTimer--;
    },1000)
} 

const startQuiz = () =>{
   let startButton = document.getElementById('start');
   startButton.classList.add("isHidden");
   console.log('hello world')
   updateTimer();
}
//    call show question function here. check timer if it runs out go to next question if they answer correctly give them points and continue with timer restart
document.getElementById('question').innerHTML = "What code Do I use to change the font in CSS?"
//run for loop 4 times and each time create a new list element and write into the li element what ever i want in it it
// for (i>0; const list = document.createElement("li");)
// list.innerHTML = "A. font-family"
// document.getElementById('answers').appendChild(list)
// }
