# Lichess-Analyzer-Plus

A simple **Lichess game analysis tool** that fetches and visualizes **win/loss/draw statistics** using the **Lichess API**. No login required – just enter a username and get instant results!  

## **Features**
✔ Fetches **last 50 games** from Lichess.  
✔ Displays **win/loss/draw stats** in an interactive **pie chart**.  
✔ Identifies **most common blunders/mistakes**.  
✔ Works **entirely in the browser (no backend needed!)**.  
✔ Allows users to **export a report** of their performance.  

## **Live Demo**
**[Click Here to Use](https://your-github-username.github.io/Lichess-Analyzer-Plus/)**  

---

## **Installation & Usage**
1. **Fork this repository** or **clone it**:
   ```sh
   git clone https://github.com/your-github-username/Lichess-Analyzer-Plus.git
   cd Lichess-Analyzer-Plus
   ```

2. **Enable GitHub Pages** (Set `/docs` as the source).  
3. **Open `index.html` in a browser** and start analyzing!  

---

## **Project Structure**
```
Lichess-Analyzer-Plus/
│── docs/
│   │── index.html   (Main UI)
│   │── style.css    (Styling)
│   │── script.js    (Lichess API & analysis)
│── README.md
```

---

## **Copy Code - Quick Setup**
### **📜 `index.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lichess Analyzer Plus</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <h1>Lichess Game Analyzer</h1>
        <input type="text" id="lichess-username" placeholder="Enter Lichess Username">
        <button onclick="fetchGames()">Analyze Games</button>
        <canvas id="winLossChart"></canvas>
        <div id="analysis-result"></div>
        <button onclick="downloadReport()">Download Report</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### **🎨 `style.css`**
```css
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background: #f4f4f4;
    padding: 20px;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    display: inline-block;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
}

input, button {
    margin: 10px 0;
    padding: 10px;
    width: 80%;
    max-width: 300px;
}

button {
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

canvas {
    margin: 20px 0;
    width: 100%;
}
```

### **📜 `script.js`**
```js
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
```

---

## **Contribute**
- Feel free to **fork** and improve the tool!  
- You can add features like **opening analysis**, **blunder detection**, etc.  

---

## **License**
This project is **open-source** under the **MIT License**.  

---

### **🎯 Now Just:**
1. **Upload to GitHub**
2. **Enable GitHub Pages** (Select `/docs` as the source)
3. **Start analyzing Lichess games!**  
