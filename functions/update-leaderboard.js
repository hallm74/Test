const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const leaderboardPath = path.resolve(__dirname, 'leaderboard.json');
    try {
        const { name, score } = JSON.parse(event.body);
        let leaderboard = [];
        if (fs.existsSync(leaderboardPath)) {
            const data = fs.readFileSync(leaderboardPath, 'utf8');
            leaderboard = JSON.parse(data);
        } else {
            // Create the file if it does not exist
            fs.writeFileSync(leaderboardPath, JSON.stringify([]));
        }
        leaderboard.push({ name, score });
        fs.writeFileSync(leaderboardPath, JSON.stringify(leaderboard, null, 2));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Leaderboard updated' }),
        };
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to update leaderboard' }),
        };
    }
};
