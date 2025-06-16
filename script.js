document.addEventListener('DOMContentLoaded', () => {

    // --- Fade-in Animation on Scroll ---
    const animatedElements = document.querySelectorAll('.product-card, section h2, .science-content, .testimonial-card, #quiz-container');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // --- Interactive Quiz Logic ---
    const quizStartDiv = document.getElementById('quiz-start');
    const startBtn = document.getElementById('start-btn');
    const quizQuestionsDiv = document.getElementById('quiz-questions');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const quizResultDiv = document.getElementById('quiz-result');
    const resultText = document.getElementById('result-text');
    const restartBtn = document.getElementById('restart-btn');

    const questions = [
        {
            question: "What is your primary goal for today?",
            answers: ["To finally do that one important thing.", "To look busy.", "To successfully locate the remote control."]
        },
        {
            question: "How would you describe your current focus level?",
            answers: ["Laser-sharp.", "About as focused as a broken sprinkler.", "I'm sorry, what was the question?"]
        },
        {
            question: "Choose a spirit animal:",
            answers: ["An eagle, soaring high.", "A cat, napping in a sunbeam.", "A potato."]
        }
    ];

    // ★★★ THIS ARRAY IS NOW UPDATED WITH THE NEW PRODUCTS ★★★
    const products = ["Mokain", "Seph", "Esde", "Slumbr™", "Social-Ease™", "Ambivalex™", "Kreativora™"];
    let currentQuestionIndex = 0;

    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        currentQuestionIndex = 0;
        quizStartDiv.classList.add('hidden');
        quizResultDiv.classList.add('hidden');
        quizQuestionsDiv.classList.remove('hidden');
        showQuestion();
    }

    function showQuestion() {
        resetState();
        const question = questions[currentQuestionIndex];
        questionText.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.classList.add('answer-btn');
            button.addEventListener('click', selectAnswer);
            answerButtons.appendChild(button);
        });
    }

    function resetState() {
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }
    
    function showResult() {
        quizQuestionsDiv.classList.add('hidden');
        quizResultDiv.classList.remove('hidden');
        // The "algorithm" is just a random choice, fitting the parody
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        resultText.innerText = `You need ${randomProduct}. It's the only logical conclusion.`;
    }
});