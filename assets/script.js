// variables

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var answercheckEl = document.querySelector("#answercheck");

// quiz game variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // class hide then remove to show questions 
  questionsEl.removeAttribute("class");

  // start timer
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // will take current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // title= current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // choices: clear old question choices
  choicesEl.innerHTML = "";

  // loop choices
  currentQuestion.choices.forEach(function(choice, i) {
    // button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // need click event listener 4 each choice
    choiceNode.onclick = questionClick;

    // show choice on page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if user ans wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize 10
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    answercheckEl.textContent = "Sorry!";
    anwercheckEl.style.color = "red";
    answercheckEl.style.fontSize = "400%";
  } else {
    answercheckEl.textContent = "Yippie!";
    answercheckEl.style.color = "green";
    answercheckEl.style.fontSize = "400%";
  }
answercheckEl.setAttribute("class", "answercheck");
setTimeout(function() {
  answercheckEl.setAttribute("class", "answercheck hide");
}, 1000);

// next question
currentQuestionIndex++;

// time checker
if (currentQuestionIndex === questions.length) {
  quizEnd();
} else {
  getQuestion();
}
}


function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "scores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;// DOM elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var answercheckEl = document.querySelector("#answercheck");
// quiz variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // remove hide
  questionsEl.removeAttribute("class");

  // timer starts
  timerId = setInterval(clockTick, 1000);

  // display time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get next question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear old  choices
  choicesEl.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    checkanswerEl.textContent = "Sorry!";
    checkanswerEl.style.color = "red";
    checkanswerEl.style.fontSize = "400%";
  } else {
    checkanswerEl.textContent = "Yippie!";
    checkanswerEl.style.color = "green";
    checkanswerEl.style.fontSize = "400%";
  }

  // flash right/wrong feedback
  checkanswerEl.setAttribute("class", "checkanswer");
  setTimeout(function() {
    checkanswerEl.setAttribute("class", "checkanswer hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  // time checker
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "score.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
