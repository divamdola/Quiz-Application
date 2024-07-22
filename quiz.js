const quizData = [
  {
    question:
      "The energy required to remove an electron from the outermost shell of an atom in its isolated gaseous state is called?",
    option: [
      "Electron Affinity",
      "Reducing Potential",
      "Ionization Potential",
      "Shell Potential",
    ],
    answer: "Ionization Potential",
  },
  {
    question: "A chloroplast without cell wall is?",
    option: ["aleuroplast", "amyloplast", "protoplast", "photoplast"],
    answer: "protoplast",
  },
  {
    question:
      "Which of the following groups of plants is known as Magnoliophyta?",
    option: ["Gymnosperms", "Angiosperms", "Algae", "Bryophyte"],
    answer: "Angiosperms",
  },
  {
    question:
      "Which of the following is not a valid conservation law of classical Physics?",
    option: [
      "Law of conservation of energy",
      "Law of conservation of current",
      "Law of conservation of angular momentum",
      "Law of conservation of charge",
    ],
    answer: "Law of conservation of current",
  },
  {
    question:
      "What is the apparent weight of the person when the elevator is accelerating downwards?",
    option: [
      "equal to the actual weight",
      "greater than the actual weight",
      "less than the actual weight",
      "0",
    ],
    answer: "less than the actual weight",
  },
  {
    question:
      "The acceleration due to gravity on any planet does not depend on which of the following?",
    option: [
      "Radius of the planet",
      "Mass of the planet",
      "Density of the planet",
      "Mass of the object",
    ],
    answer: "Mass of the object",
  },
  {
    question: "Which of the following is correct about mechanical waves?",
    option: [
      "they require a medium to propagate",
      "they don’t require a medium to propagate",
      " may or may not require a medium to propagate",
      "None of the above",
    ],
    answer: "they require a medium to propagate",
  },
  {
    question: "What is the refractive index of water?",
    option: ["1", "1.01", "1.33", "1.78"],
    answer: "1.33",
  },
  {
    question: "Which of these non-metals are present in Gun powder?",
    option: ["Sulphur", "Carbon", "Nitrogen", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "Who introduced the three kingdoms of classification?",
    option: ["RH Whittaker", "Ernest Haeckel", "Copeland", "Carolus Linnaeus"],
    answer: "Ernest Haeckel",
  },
];

const quiz = document.querySelector(".quiz");
const result = document.querySelector("#result");
const submit = document.querySelector("#submit");
const reset = document.querySelector("#reset");
const showAnswerButton = document.querySelector("#show-answer");

let currentQuestion = 0;
let score = 0;
let incorrectAns = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = questionData.option;
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quiz.innerHTML = "";
  quiz.appendChild(questionElement);
  quiz.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector("input[name='quiz']:checked");
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAns.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quiz.style.display = "none";
  submit.style.display = "none";
  reset.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  result.innerHTML = `You Scored ${score} out of ${quizData.length}!`;
}
function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAns = [];
  quiz.style.display = "block";
  submit.style.display = "inline-block";
  reset.style.display = "none";
  showAnswerButton.style.display = "none";
  result.innerHTML = "";
  displayQuestion();
}

function showAnswer() {
  quiz.style.display = "none";
  submit.style.display = "none";
  reset.style.display = "inline-block";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAns.length; i++) {
    incorrectAnswersHtml += `<p>
    <strong>Question:</strong>${incorrectAns[i].question}<br>
    <strong>Your Answer:</strong>${incorrectAns[i].incorrectAnswer}<br>
    <strong>Correct Answer:</strong>${incorrectAns[i].correctAnswer}
    </p>
    `;
  }
  result.innerHTML = `
  You scored ${score} out of ${quizData.length}!
  Incorrect Answers:
  ${incorrectAnswersHtml}
  `;
}

document.querySelector("#login-button").addEventListener("click", function () {
  document.querySelector(".login").style.display = "none";
});

submit.addEventListener("click", checkAnswer);
reset.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

const login=document.querySelector("#login-button");
const fullName=document.querySelector("#full-name");
const email=document.querySelector("#email");

login.addEventListener("click",function(){
  const mail=email.value;
  const name=fullName.value;
  console.log(`Your full name is ${name} having email id ${mail}`);
  document.querySelector(".login").style.display="none";
  document.querySelector(".blur-body").style.display="contents";
  document.querySelector(".username").innerHTML=`Welcome<br>${name}`;
})

displayQuestion();
