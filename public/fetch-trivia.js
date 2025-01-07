async function fetchTriviaQuestions(category, difficulty, amount = 10) {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
        return [];
    }
}
