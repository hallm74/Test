const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const leaderboardPath = path.resolve(__dirname, 'leaderboard.json');
    console.log(`Reading leaderboard from: ${leaderboardPath}`);
    try {
        if (!fs.existsSync(leaderboardPath)) {
            // Return an empty leaderboard if the file does not exist
            return {
                statusCode: 200,
                body: JSON.stringify([]),
            };
        }
        const data = fs.readFileSync(leaderboardPath, 'utf8');
        const leaderboard = JSON.parse(data);
        return {
            statusCode: 200,
            body: JSON.stringify(leaderboard),
        };
    } catch (error) {
        console.error('Error reading leaderboard:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch leaderboard' }),
        };
    }
};
