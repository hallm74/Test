document.addEventListener('DOMContentLoaded', () => {
    const questionTitle = document.getElementById('question-title');
    const optionsContainer = document.getElementById('options-container');
    const nextQuestionButton = document.getElementById('next-question');
    const timerProgress = document.getElementById('timer-progress');
    const leaderboardBody = document.getElementById('leaderboard-body');
    const darkModeToggle = document.getElementById('darkModeToggle');
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];
    let scoreSubmitted = false; // Flag to track if the score has been submitted
    let timerInterval; // Declare timerInterval in the outer scope

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    async function loadQuestions() {
        const categoryID = 11; // Film category ID
        questions = await fetchTriviaQuestions(categoryID, 'easy'); // Example difficulty
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex >= questions.length) {
            if (!scoreSubmitted) {
                submitScore();
            }
            return;
        }
        const question = questions[currentQuestionIndex];
        questionTitle.innerHTML = question.question;
        optionsContainer.innerHTML = '';
        question.incorrect_answers.concat(question.correct_answer).forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'list-group-item list-group-item-action';
            optionElement.innerHTML = option;
            optionElement.addEventListener('click', () => checkAnswer(option, question.correct_answer));
            optionsContainer.appendChild(optionElement);
        });
        startTimer();
    }

    function checkAnswer(selected, correct) {
        if (selected === correct) {
            score++;
        }
        currentQuestionIndex++;
        clearInterval(timerInterval); // Clear the timer interval when an answer is selected
        displayQuestion();
    }

    function startTimer() {
        let timeLeft = 100;
        timerProgress.style.width = '100%'; // Reset the progress bar width
        clearInterval(timerInterval); // Clear any existing timer interval
        timerInterval = setInterval(() => {
            timeLeft--;
            timerProgress.style.width = `${timeLeft}%`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                currentQuestionIndex++;
                displayQuestion();
            }
        }, 500); // Increase the interval duration to slow down the timer
    }

    async function submitScore() {
        const playerName = prompt('Enter your name:');
        if (playerName) {
            await updateLeaderboard(playerName, score);
            scoreSubmitted = true; // Set the flag to true after submitting the score
            displayLeaderboard();
        }
    }

    async function displayLeaderboard() {
        const leaderboard = await getLeaderboard();
        leaderboardBody.innerHTML = '';
        leaderboard.sort((a, b) => b.score - a.score).slice(0, 5).forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${entry.name}</td>
                <td>${entry.score}</td>
            `;
            leaderboardBody.appendChild(row);
        });
    }

    loadQuestions();
    displayLeaderboard();
});
