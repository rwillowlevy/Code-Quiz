var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
      "strings",
      "booleans",
      "alerts",
      "numbers"
    ],
    id: "question-1",
    correctAnswer: "alerts"
  },
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    answers: [
      "quotes",
      "curly brackets",
      "parentheses",
      "square brackets"
    ],
    id: "question-2",
    correctAnswer: "parentheses"
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    id: "question-3",
    correctAnswer: "all of the above"
  },
  {
    question: "String values must be enclosed within ____ when being assigned to variables.",
    answers: [
      "commas",
      "curly brackets",
      "quotes",
      "parentheses"
    ],
    id: "question-4",
    correctAnswer: "quotes"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "Javascript",
      "terminal / bash",
      "for loops",
      "console.log"
    ],
    id: "question-5",
    correctAnswer: "console.log"
  }
];
var card = $("#questions")
var timeRemaining = 240;
var timer
var game = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  timeRemaining: timeRemaining,
  currentQuestion: 0,
  countdown: function () {
    this.timeRemaining--;
    $("#timeRemain").text(this.timeRemaining + " Seconds Left");
    if (this.timeRemaining === 0) {
      this.stop()
      alert("Time is up!")
      this.checkAnswers()
    }
  }, 
  questionForm: function () {
    timer = setInterval(this.countdown.bind(this), 1000)
    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>")
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class = 'answer-button' id = 'button' data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i] + "</button>")
    }
  },
  nextQuestion: function () {
    this.currentQuestion ++
    this.questionForm.bind(this)()
  },
  stop: function () {
    clearInterval(window.timer)
    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 1000) 
    }
    else {
      setTimeout(this.nextQuestion, 1000)
    }
  },
  results: function () {
    clearInterval (window.timer)
    $("#timeRemain").text(this.timeRemaining)
    card.append("<h3>Correct Answers:  " + this.correct + "</h3>")
    card.append("<h3>Incorrect Answers:  " + this.incorrect + "</h3>")
    card.append("<h3>Unanswered:  " + (questions.length - (this.incorrect + this.correct)) + "</h3>")
    card.append("<br><button id ='start-over'>Start Over?</button>")
  },
  clicked: function (e) {
    clearInterval(window.timer)
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly()
    }
    else {this.answeredIncorrectly()
    }
    console.log(questions[this.currentQuestion].correctAnswer)
  },
  answeredCorrectly: function () {
    this.correct++
    clearInterval(window.timer)
    card.html("<h2>Correct</h2>")
    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 1000) 
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 1000)
    }
  },
  answeredIncorrectly: function () {
    this.incorrect++
    clearInterval(window.timer)
    timer - 10;
    card.html("<h2>Incorrect</h2>")
    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 1000)
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 1000)
    }
  },
  reset: function () {
    this.currentQuestion = 0;
    this.correct = 0;
    this.incorrect = 0;
    this.timeRemaining = timeRemaining;
    this.questionForm();
  }
}
$(document).on("click","#start-over",game.reset.bind(game))
$(document).on("click",".answer-button",function (e) {
  game.clicked.bind(game,e)()
})
$(document).on("click","#start",function (){
  game.questionForm.bind (game)()
})