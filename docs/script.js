async function fetchGames() {
    const username = document.getElementById("lichess-username").value.trim();
    if (!username) {
        alert("Enter your Lichess username!");
        return;
    }

    const url = `https://lichess.org/api/games/user/${username}?max=50&moves=false&clocks=false&evals=false&pgnInJson=true`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            alert("Failed to fetch data. Check username!");
            return;
        }
        const gamesText = await response.text();
        if (!gamesText.trim()) {
            alert("No games found for this user!");
            return;
        }
        const games = gamesText.trim().split("\n").map(JSON.parse);
        analyzeGames(games, username);
    } catch (error) {
        alert("Error fetching data. Try again later.");
        console.error(error);
    }
}

function analyzeGames(games, username) {
    let wins = 0, losses = 0, draws = 0;

    games.forEach(game => {
        const isWhite = game.players.white?.user?.name?.toLowerCase() === username.toLowerCase();
        const isBlack = game.players.black?.user?.name?.toLowerCase() === username.toLowerCase();

        if (!isWhite && !isBlack) return; // Skip games where username isn't found

        if (game.winner === "white") {
            isWhite ? wins++ : losses++;
        } else if (game.winner === "black") {
            isBlack ? wins++ : losses++;
        } else {
            draws++;
        }
    });

    drawChart(wins, losses, draws);
}

function drawChart(wins, losses, draws) {
    const ctx = document.getElementById('winLossChart').getContext('2d');
    if (window.currentChart) window.currentChart.destroy(); // Prevent duplicate charts

    window.currentChart = new Chart(ctx, {
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
    const username = document.getElementById("lichess-username").value.trim();
    if (!username) {
        alert("Enter your Lichess username first!");
        return;
    }
    const data = `${username}'s Lichess Report\nWins: ${wins}\nLosses: ${losses}\nDraws: ${draws}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${username}_lichess_report.txt`;
    link.click();
}
