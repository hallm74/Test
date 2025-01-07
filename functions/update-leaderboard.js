const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const leaderboardPath = path.resolve(__dirname, 'leaderboard.json');
    try {
        const { name, score } = JSON.parse(event.body);
        const data = fs.readFileSync(leaderboardPath, 'utf8');
        const leaderboard = JSON.parse(data);
        leaderboard.push({ name, score });
        fs.writeFileSync(leaderboardPath, JSON.stringify(leaderboard, null, 2));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Leaderboard updated' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to update leaderboard' }),
        };
    }
};
