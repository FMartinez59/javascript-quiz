import "./styles.css";
let startTimer = 10;
var screen0El = document.querySelector("#screen0");
var screen1El = document.querySelector("#screen1");
var screen2El = document.querySelector("#screen2")


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
