let quesTimerEl = document.querySelector("#quesTimer");
let mainEl = document.querySelector("#details");
let timerTab = document.querySelector("#timers");

var test = false;
var score = 0;
var quiz = {};
var questionDuration = 20;
var questionSecElapsed = 0;
var questionInterval;

init();
function init() {
  clearDetails();
  reset();
  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "This is a time quiz!";

  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " You will have 20 seconds to answer each question.For each correct question you will score 1 point."; 
  
  let par = document.createElement("p");

  let nameLabel = document.createElement("label");
  nameLabel.setAttribute("for","Name");
  nameLabel.textContent = "Enter Name: ";

  let nameInput = document.createElement("input");
  nameInput.setAttribute("id","Name");
  nameInput.setAttribute("name","Name");
  nameInput.setAttribute("minlength","2");
  nameInput.setAttribute("maxlength","20");
  nameInput.setAttribute("size","10");

  let startJsQuiz = document.createElement("button");
  startJsQuiz.setAttribute("id", "startJSQuiz");
  startJsQuiz.setAttribute("class", "btn btn-secondary");
  startJsQuiz.textContent= "Start Quiz";

  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(startJsQuiz);
  mainEl.appendChild(nameInput);
  mainEl.appendChild(nameLabel);

  startJsQuiz.addEventListener("click", function () {
    playQuiz(jsQuestions);
  });

  
}

function clearDetails() {
  mainEl.innerHTML = "";
}

function reset() {
  score = 0;
  questionDuration = 20;
  questionSecElapsed = 0;
  questionInterval;
}

//start game
function playQuiz(questionSet) {
  if (test) { console.log(" playQuiz "); }  
  quiz = setUpQuestions(questionSet);
  timerTab.setAttribute("style", "visibility: visible;");  
  if (test) { console.log("duration:",questionDuration); } 
  renderTime();
  presentQuestion();
}

function setUpQuestions(arr) {
  if (test) {console.log(" setUpQuestions ");}
  let ranQuest = [];
  for (let i=0; i<arr.length; i++) {
    ranQuest.push(arr[i]);
  }
  return ranQuest;
}

function presentQuestion() {
  if (test) {console.log(" presentQuestion ");}
  questionSecElapsed = 0;
  if ( quiz.length === 0 ) {
    endOfGame();
    return;
  }
  curQuestion = quiz.pop();  
  clearDetails();
  let question = document.createElement("h1");
  question.setAttribute("question", curQuestion.title);
  question.textContent = curQuestion.title;
  mainEl.appendChild(question)


  let choiceBox = document.createElement("ul");
  choiceBox.setAttribute("id","choiceBox");
  mainEl.appendChild(choiceBox);


  for( let i=0; i<curQuestion.choices.length; i++ ) {

    let listChoice = document.createElement("li");
  
    listChoice.setAttribute("choice-value", curQuestion.choices[i]);
    listChoice.setAttribute("id","questionNum-"+i);
    listChoice.textContent = curQuestion.choices[i];
    
    choiceBox.appendChild(listChoice)
  }

  if (test) { console.log("cur", curQuestion);}  
  choiceBox.addEventListener("click", function (){
    scoreAnswer(curQuestion);
  });

}

function scoreAnswer(cur) {
  if (test) { console.log(" scoreAnswer ");}
  var e = event.target;
  if ( e.matches("li")) {
    let selectedItem = e.textContent;
    if (test) { console.log("selectedItem quiz " + selectedItem); }
    if ( selectedItem === cur.answer ) {
      score += 1;      
    } else {
      if (test) { console.log("wrong answer");}
     score += 0
    }
  if (test) { console.log("sselected ",selectedItem);}
    showAnswers(cur);
  }
}

function showAnswers(cur) {
  if (test) { console.log(" showAnswer "); }
  if (test) { console.log("cur",cur);}
  if (test) { console.log("selected ",selectedItem);}


  for (let i=0; i<cur.choices.length; i++) {
    if (test) { console.log("sa in for ",i);}

    let questid = "#questionNum-" + i;
    let questrow = document.querySelector(questid);

    if (test) { console.log("saf selected" + selectedItem + "<");}
    if (test) { console.log("saf color test >" +  cur.choices[i] +"<");}

    if ( cur.choices[i] !== cur.answer ) {
      if (test) { console.log("color test false");}
      questrow.setAttribute("style","background-color: red");
    } else {
      if (test) { console.log("color test true");}
      questrow.setAttribute("style","background-color: green");
    }
  }
  setTimeout(presentQuestion,1000);
}
  function renderTime() {
  quesTimerEl.textContent = questionDuration - questionSecElapsed;
    if ( (questionDuration - questionSecElapsed) < 1 ) {        
       if (test) { console.log("too slow"); }
          presentQuestion();
          
  } 

}
function stopTime() {
  if (test) { console.log(" stopTime  ");}
  questionSeconds = 0;
}


function endOfGame() {
  if (test) { console.log(" endOfGame "); }
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "GAME OVER";

  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " Your score is " + score; 
  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);

  
  
}      

