function Question (text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return choice === this.answer;
};

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
};

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkAnswer = function(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer) ) {
        this.score++;
    }
    this.questionIndex++;
};

Quiz.prototype.isEnded = function() {
    return this.questions.length === this.questionIndex;
};

function showScore() {
    document.querySelector( '#quiz' ).innerHTML = `
      <h1>Result</h1>
      <div id="score">You scored ${techQuiz.score} / ${techQuiz.questions.length}</div>
    `;
  }

function loadQuestion() {
    if(techQuiz.isEnded()){
        showScore();
        return;
    }
    
    var currentQuestion = techQuiz.getCurrentQuestion();

    document.querySelector('#question').textContent = currentQuestion.text;

    for (var i=0; i<currentQuestion.choices.length; i++){
        document.getElementById('choice'+i).textContent = currentQuestion.choices[i];
        handleOptionButtonClick('btn' +i, currentQuestion.choices[i]);
    }
    showProgress();
};

function handleOptionButtonClick(btnId, choice) {
    var button = document.querySelector('#' + btnId);
    button.onclick = function() {
        techQuiz.checkAnswer(choice);
        loadQuestion();
    }
}

function showProgress() {
    document.querySelector('#progress').textContent = 'Question' + (techQuiz.questionIndex+1) + 'of' +techQuiz.questions.length;
}

var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
  ];

const techQuiz = new Quiz (questions);
loadQuestion();
