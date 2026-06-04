const questions = [

    {
        question:
            "What does JS stand for?",

        options: [
            "JavaSource",
            "JavaScript",
            "JustStyle",
            "JSON"
        ],

        answer: 1
    },

    {
        question:
            "Which keyword declares a variable?",

        options: [
            "make",
            "create",
            "let",
            "define"
        ],

        answer: 2
    },

    {
        question:
            "What does DOM mean?",

        options: [
            "Document Object Model",
            "Data Object Method",
            "Desktop Object Management",
            "Document Orientation Model"
        ],

        answer: 0
    },

    {
        question:
            "Which company created JavaScript?",

        options: [
            "Google",
            "Microsoft",
            "Netscape",
            "Apple"
        ],

        answer: 2
    },

    {
        question:
            "Which symbol is for comments?",

        options: [
            "//",
            "##",
            "**",
            "!!"
        ],

        answer: 0
    },

    {
        question:
            "Which is NOT a data type?",

        options: [
            "Boolean",
            "String",
            "Float",
            "Number"
        ],

        answer: 2
    },

    {
        question:
            "Which method prints to console?",

        options: [
            "print()",
            "show()",
            "console.log()",
            "display()"
        ],

        answer: 2
    },

    {
        question:
            "How many values can a boolean hold?",

        options: [
            "1",
            "2",
            "3",
            "4"
        ],

        answer: 1
    },

    {
        question:
            "Which operator means strict equality?",

        options: [
            "=",
            "==",
            "===",
            "!="
        ],

        answer: 2
    },

    {
        question:
            "Which event detects clicks?",

        options: [
            "hover",
            "click",
            "press",
            "mouse"
        ],

        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const questionEl =
    document.getElementById("question");

const answersEl =
    document.getElementById("answers");

const nextBtn =
    document.getElementById("next-btn");

const progressBar =
    document.getElementById("progress-bar");

const timerEl =
    document.getElementById("timer");

let timeLeft = 15;
let timer;


// SHOW QUESTION
function showQuestion() {

    clearInterval(timer);

    timeLeft = 15;

    timerEl.textContent =
        `Time Left: ${timeLeft}s`;

    startTimer();

    const question =
        questions[currentQuestion];

    questionEl.textContent =
        question.question;

    answersEl.innerHTML = "";

    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.textContent =
                option;

            button.classList.add(
                "answer-btn"
            );

            button.addEventListener(
                "click",
                () => selectAnswer(index)
            );

            answersEl.appendChild(
                button
            );
        }
    );

    updateProgress();
}


// SELECT ANSWER
function selectAnswer(index) {

    const correctAnswer =
        questions[
            currentQuestion
        ].answer;

    userAnswers.push({
        question:
            questions[currentQuestion]
                .question,

        selected:
            questions[
                currentQuestion
            ].options[index],

        correct:
            questions[
                currentQuestion
            ].options[
                correctAnswer
            ]
    });

    if (index === correctAnswer) {
        score++;
    }

    nextQuestion();
}


// NEXT QUESTION
function nextQuestion() {

    currentQuestion++;

    if (
        currentQuestion <
        questions.length
    ) {
        showQuestion();
    } else {
        showResults();
    }
}


// PROGRESS BAR
function updateProgress() {

    const progress =
        ((currentQuestion + 1)
            / questions.length)
        * 100;

    progressBar.style.width =
        progress + "%";
}


// TIMER
function startTimer() {

    timer =
        setInterval(() => {

            timeLeft--;

            timerEl.textContent =
                `Time Left: ${timeLeft}s`;

            if (timeLeft === 0) {

                clearInterval(
                    timer
                );

                nextQuestion();
            }

        }, 1000);
}


// RESULTS PAGE
function showResults() {

    clearInterval(timer);

    const bestScore =
        localStorage.getItem(
            "bestScore"
        ) || 0;

    if (score > bestScore) {

        localStorage.setItem(
            "bestScore",
            score
        );
    }

    let reviewHTML = "";

    userAnswers.forEach(
        answer => {

            reviewHTML += `
            <div>
                <h4>${answer.question}</h4>
                <p>
                    Your answer:
                    ${answer.selected}
                </p>

                <p>
                    Correct answer:
                    ${answer.correct}
                </p>
            </div>
            <hr>
            `;
        }
    );

    document.querySelector(
        ".quiz-container"
    ).innerHTML = `
        <h1>Quiz Finished</h1>

        <h2>
            Score:
            ${score}/10
        </h2>

        <h3>
            Best Score:
            ${
                localStorage.getItem(
                    "bestScore"
                )
            }
        </h3>

        ${reviewHTML}
    `;
}

showQuestion();