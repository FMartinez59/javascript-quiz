let startTimer = 10;

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
   updateTimer();
//    call show question function here. check timer if it runs out go to next question if they answer correctly give them points and continue with timer restart
}

document.getElementById('start').addEventListener('click',startQuiz);