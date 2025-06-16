// Show section
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');
}

// ------------------ QUIZ ------------------
const questions = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    answer: "Delhi"
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "CSS", "Python", "C++"],
    answer: "CSS"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Apple", "Netscape", "Google"],
    answer: "Netscape"
  }
];

let current = 0;
let score = 0;

function startQuiz() {
  current = 0;
  score = 0;

  document.getElementById("quiz-container").innerHTML = `
    <div id="question"></div>
    <div id="answers"></div>
    <button onclick="submitAnswer()">Submit</button>
    <div id="result"></div>
  `;

  showSection('quiz');
  loadQuestion();
}

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach(opt => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="answer" value="${opt}"> ${opt}`;
    answersDiv.appendChild(label);
  });

  document.getElementById("result").innerText = "";
}

function submitAnswer() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  if (selected.value === questions[current].answer) {
    score++;
  }

  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-container").innerHTML = `
      <h3>Your score: ${score}/${questions.length}</h3>
      <button onclick="startQuiz()">Restart Quiz</button>
    `;
  }
}

// ------------------ JOKE ------------------
function getJoke() {
  fetch("https://icanhazdadjoke.com/", {
    headers: { "Accept": "application/json" }
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("joke-text").innerText = data.joke;
    })
    .catch(() => {
      document.getElementById("joke-text").innerText = "Sorry! Couldn't fetch a joke.";
    });
}
