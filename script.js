const questions = [

{
question: "What does HTML stand for?",
answers: [
{ text: "Hyper Text Markup Language", correct: true },
{ text: "Home Tool Markup Language", correct: false },
{ text: "Hyperlinks Text Mark Language", correct: false },
{ text: "Hyper Tool Multi Language", correct: false }
]
},

{
question: "Which language is used for styling websites?",
answers: [
{ text: "HTML", correct: false },
{ text: "CSS", correct: true },
{ text: "JavaScript", correct: false },
{ text: "Python", correct: false }
]
},

{
question: "Which language makes websites interactive?",
answers: [
{ text: "HTML", correct: false },
{ text: "CSS", correct: false },
{ text: "JavaScript", correct: true },
{ text: "C++", correct: false }
]
},

{
question: "Inside which HTML tag do we put JavaScript?",
answers: [
{ text: "<script>", correct: true },
{ text: "<javascript>", correct: false },
{ text: "<js>", correct: false },
{ text: "<code>", correct: false }
]
},

{
question: "Which CSS property changes text color?",
answers: [
{ text: "color", correct: true },
{ text: "font-style", correct: false },
{ text: "text-color", correct: false },
{ text: "background-color", correct: false }
]
},

{
question: "How do you select an element by ID in CSS?",
answers: [
{ text: "#id", correct: true },
{ text: ".id", correct: false },
{ text: "*id", correct: false },
{ text: "id.", correct: false }
]
},

{
question: "Which HTML tag is used for images?",
answers: [
{ text: "<img>", correct: true },
{ text: "<image>", correct: false },
{ text: "<pic>", correct: false },
{ text: "<src>", correct: false }
]
},

{
question: "Which method prints in console?",
answers: [
{ text: "console.log()", correct: true },
{ text: "print()", correct: false },
{ text: "console.write()", correct: false },
{ text: "log.console()", correct: false }
]
},

{
question: "Which symbol is used for comments in JavaScript?",
answers: [
{ text: "//", correct: true },
{ text: "<!-- -->", correct: false },
{ text: "#", correct: false },
{ text: "**", correct: false }
]
},

{
question: "Which HTML tag creates a link?",
answers: [
{ text: "<a>", correct: true },
{ text: "<link>", correct: false },
{ text: "<href>", correct: false },
{ text: "<url>", correct: false }
]
},

{
question: "Which attribute is used for image source?",
answers: [
{ text: "src", correct: true },
{ text: "href", correct: false },
{ text: "link", correct: false },
{ text: "path", correct: false }
]
},

{
question: "Which CSS property controls font size?",
answers: [
{ text: "font-size", correct: true },
{ text: "text-size", correct: false },
{ text: "size", correct: false },
{ text: "font-style", correct: false }
]
},

{
question: "How do you declare a variable in JavaScript?",
answers: [
{ text: "var myVar;", correct: true },
{ text: "variable myVar;", correct: false },
{ text: "v myVar;", correct: false },
{ text: "declare myVar;", correct: false }
]
},

{
question: "Which symbol selects a class in CSS?",
answers: [
{ text: ".", correct: true },
{ text: "#", correct: false },
{ text: "*", correct: false },
{ text: "&", correct: false }
]
},

{
question: "Which company developed JavaScript?",
answers: [
{ text: "Netscape", correct: true },
{ text: "Google", correct: false },
{ text: "Microsoft", correct: false },
{ text: "Apple", correct: false }
]
},

{
question: "Which HTML element is the largest heading?",
answers: [
{ text: "<h1>", correct: true },
{ text: "<h6>", correct: false },
{ text: "<head>", correct: false },
{ text: "<heading>", correct: false }
]
},

{
question: "Which property changes background color?",
answers: [
{ text: "background-color", correct: true },
{ text: "bgcolor", correct: false },
{ text: "color-background", correct: false },
{ text: "background-style", correct: false }
]
},

{
question: "Which JavaScript function shows a popup?",
answers: [
{ text: "alert()", correct: true },
{ text: "popup()", correct: false },
{ text: "show()", correct: false },
{ text: "message()", correct: false }
]
},

{
question: "Which tag defines a paragraph?",
answers: [
{ text: "<p>", correct: true },
{ text: "<para>", correct: false },
{ text: "<text>", correct: false },
{ text: "<paragraph>", correct: false }
]
},

{
question: "CSS stands for?",
answers: [
{ text: "Cascading Style Sheets", correct: true },
{ text: "Creative Style System", correct: false },
{ text: "Computer Style Sheets", correct: false },
{ text: "Colorful Style Syntax", correct: false }
]
}

];
const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    document.querySelector(".answers").style.display = "block";
    timerElement.style.display = "block";
    restartButton.style.display = "none";
    nextButton.style.display = "block";

    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    timerElement.innerText = "Time: " + timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = "Time: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            goNext();
        }
    }, 1000);

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    answerButtons.forEach((button, index) => {
        button.innerText = currentQuestion.answers[index].text;
        button.classList.remove("correct", "wrong");

        button.onclick = () => selectAnswer(currentQuestion.answers[index]);
    });

    let progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

function selectAnswer(answer) {
    clearInterval(timer);

    if (answer.correct) {
        score++;
    }

    answerButtons.forEach((button, index) => {
        if (questions[currentQuestionIndex].answers[index].correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }
    });
}

function goNext() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.innerHTML = `🎉 Your Final Score: ${score} / ${questions.length}`;
    document.querySelector(".answers").style.display = "none";
    nextButton.style.display = "none";
    restartButton.style.display = "block";
    timerElement.style.display = "none";
    progressBar.style.width = "100%";

    localStorage.setItem("quizScore", score);
}

nextButton.onclick = goNext;
restartButton.onclick = startQuiz;

startQuiz();
