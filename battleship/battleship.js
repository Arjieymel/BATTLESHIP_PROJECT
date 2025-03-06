var size = 5, totalShips = 3, maxAttempts = 20;
let ships = [], attempts = 0;
var board = document.getElementById("game-board"), message = document.getElementById("message");

// Create game board
for (let i = 0; i < size ** 2; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", attack);
    board.appendChild(cell);
}

// Place ships randomly
while (ships.length < totalShips) {
    let randomPos = Math.floor(Math.random() * size ** 2);
    if (!ships.includes(randomPos)) ships.push(randomPos);
}

// Handle attack
function attack(event) {
    if (attempts >= maxAttempts) return; // Stop if no attempts left
    attempts++;

    let index = +event.target.dataset.index;
    if (ships.includes(index)) {
        event.target.classList.add("hit");
        message.textContent = "Hit!";
        ships = ships.filter(pos => pos !== index);
    } else {
        event.target.classList.add("miss");
        message.textContent = "Miss!";
    }

    event.target.removeEventListener("click", attack); // Prevent re-click

    // Check game status
    if (ships.length === 0) message.textContent = "YOU SUNKS ALL SHIPS! 🎉";
    else if (attempts >= maxAttempts) message.textContent = "Game Over! No more attempts.";
}
