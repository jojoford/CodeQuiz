// variables

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");

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
    feedbackEl.textContent = "Sorry!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
  } else {
    feedbackEl.textContent = "Yippie!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";
  }
  