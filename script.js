const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
  {
    question: "What is the <a> tag used for?",
    answers: [
      { text: "Linking to sections within a page", correct: false },
      { text: "Linking to other pages", correct: false },
      { text: "Creating hyperlinks", correct: true },
      { text: "Linking to emails (mailto:)", correct: false },
    ],
  },
  {
    question: "How do you make text bold in CSS?",
    answers: [
      { text: "font-weight: bold;", correct: true },
      { text: "Using <strong> in HTML", correct: false },
      { text: "font-weight: 700;", correct: false },
      { text: "Via the b tag (not recommended)", correct: false },
    ],
  },
  {
    question: "What does ' display: flex; ' do?",
    answers: [
      { text: "Makes child items flexible in size", correct: false },
      { text: "Aligns items horizontally by default", correct: false },
      { text: "Allows easy centering of elements", correct: false },
      { text: "Enables Flexbox layout", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What does === do in JavaScript?",
    answers: [
      { text: "Strict equality check", correct: false },
      { text: "Compares value and type", correct: false },
      { text: "5 === '5' → false", correct: true },
      { text: "Prevents type coercion", correct: false },
    ],
  },
];

currentQuestionIndex = 0;
score = 0;
answersDisabled = false;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0; 
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercentage = (currentQuestionIndex  / quizQuestions.length) * 100;
  progressBar.style.width = progressPercentage + "%";

  questionText.textContent = currentQuestion.question;
  
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button"); 
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;

    button.addEventListener("click", (event) => { 
      if (answersDisabled) return;

      answersDisabled = true;

      const btn = event.target;
      const isCorrect = btn.dataset.correct === "true";

      Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        } else if (button === btn) {
          button.classList.add("incorrect");
        }
      });

      if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
      }

      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
          showQuestion();
        } else {
          showResult();
        }
      }, 1500);
    });

    answersContainer.appendChild(button); 
  });

}

function showResult() {
  startScreen.classList.remove("active");
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  maxScoreSpan.textContent = quizQuestions.length;

  const percentage = (score / quizQuestions.length) * 100;
  
  if (percentage === 100) {
    resultMessage.textContent = "Perfect Score! Well done!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job!";
  } else if (percentage >= 50) {
    resultMessage.textContent = "Good effort!";
  } else {
    resultMessage.textContent = "Better luck next time!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
