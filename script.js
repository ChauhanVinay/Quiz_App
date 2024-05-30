const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Dinosaur", correct: false }
        ] 
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false }
        ] 
    },
    {
        question: "Who wrote Romeo and Juliet?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Charles Dickens", correct: false },
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false }
        ] 
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "Mars", correct: false }
        ] 
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            { text: "Monaco", correct: false },
            { text: "Vatican City", correct: true },
            { text: "San Marino", correct: false },
            { text: "Liechtenstein", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons  = document.getElementById("answer-buttons");
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
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

     function resetState() {
        nextButton.style.display = "none";
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);
        }
     }
    
     function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        } else {
            selectedBtn.classList.add("incorrect");
        }

        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }

            button.disabled = true;
        });
        nextButton.style.display = "block";
     }

     function showScore() {
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${questions.length} questions.`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";

     }

        function handleNextButton() {
            currentQuestionIndex++;
            if(currentQuestionIndex < questions.length){
                showQuestion();
            } else {
               showScore();
            }
        }

     nextButton.addEventListener("click", () => {
            if(currentQuestionIndex < questions.length){
                handleNextButton();
            } else {
                startQuiz();
            }
        });

startQuiz();