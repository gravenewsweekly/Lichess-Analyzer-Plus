async function fetchGames() {
    const username = document.getElementById("lichess-username").value;
    if (!username) {
        alert("Enter your Lichess username!");
        return;
    }

    const url = `https://lichess.org/api/games/user/${username}?max=50&moves=false&pgnInJson=true`;
    const response = await fetch(url);
    const gamesText = await response.text();
    
    if (!gamesText) {
        alert("No games found!");
        return;
    }

    const games = gamesText.trim().split("\n").map(JSON.parse);
    analyzeGames(games);
}

function analyzeGames(games) {
    let wins = 0, losses = 0, draws = 0;
    
    games.forEach(game => {
        if (game.winner === "white" && game.players.white.user.name) {
            wins++;
        } else if (game.winner === "black" && game.players.black.user.name) {
            wins++;
        } else if (!game.winner) {
            draws++;
        } else {
            losses++;
        }
    });

    drawChart(wins, losses, draws);
}

function drawChart(wins, losses, draws) {
    const ctx = document.getElementById('winLossChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Wins', 'Losses', 'Draws'],
            datasets: [{
                data: [wins, losses, draws],
                backgroundColor: ['#28a745', '#dc3545', '#ffc107']
            }]
        }
    });
}

function downloadReport() {
    const data = document.getElementById("lichess-username").value + "'s Lichess Report\n" + 
                 "Wins: " + wins + "\nLosses: " + losses + "\nDraws: " + draws;
    const blob = new Blob([data], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "lichess_report.txt";
    link.click();
}
