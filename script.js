const questions = [
  {
    question: "What year was the American revolution?",
    answers: [
      { text: "1774", correct: false },
      { text: "1775", correct: false },
      { text: "1776", correct: true },
      { text: "1778", correct: false }
    ]
  },
  {
    question: "What is the hottest place on the world?",
    answers: [
      { text: "Death Valley", correct: true },
      { text: "Antarctica", correct: false },
      { text: "Ur-anus", correct: false },
      { text: "Sahara", correct: false }
    ]
  },
  {
    question: "Which animal was on planet before trees?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Shark", correct: true },
      { text: "Monkey", correct: false },
      { text: "Dog", correct: false }
    ]
  },
  {
    question: "Which state has Alps mountains on the south border?",
    answers: [
      { text: "Spain", correct: false },
      { text: "Italy", correct: false },
      { text: "Japan", correct: false },
      { text: "Germany", correct: true }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetEstate();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetEstate() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetEstate();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length){
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();