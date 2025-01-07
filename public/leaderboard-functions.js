async function getLeaderboard() {
    try {
        const response = await fetch('/.netlify/functions/get-leaderboard');
        const leaderboard = await response.json();
        return leaderboard;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }
}

async function updateLeaderboard(name, score) {
    try {
        const response = await fetch('/.netlify/functions/update-leaderboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, score }),
        });
        return response.json();
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        return null;
    }
}
