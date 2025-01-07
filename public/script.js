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

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    async function loadQuestions() {
        questions = await fetchTriviaQuestions(9, 'easy'); // Example category and difficulty
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestionIndex >= questions.length) {
            submitScore();
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
        displayQuestion();
    }

    function startTimer() {
        let timeLeft = 100;
        const timerInterval = setInterval(() => {
            timeLeft--;
            timerProgress.style.width = `${timeLeft}%`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                currentQuestionIndex++;
                displayQuestion();
            }
        }, 100);
    }

    async function submitScore() {
        const playerName = prompt('Enter your name:');
        await updateLeaderboard(playerName, score);
        displayLeaderboard();
    }

    async function displayLeaderboard() {
        const leaderboard = await getLeaderboard();
        leaderboardBody.innerHTML = '';
        leaderboard.sort((a, b) => b.score - a.score).forEach((entry, index) => {
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
