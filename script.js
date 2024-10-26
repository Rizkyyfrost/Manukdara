const bird = document.getElementById("bird");
const pipe = document.getElementById("pipe");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart");
const flapButton = document.getElementById("flap-button");

let birdY = 200;
let gravity = 2;
let score = 0;
let gameActive = true;

// Start the game
function startGame() {
    flapButton.addEventListener("click", flap);
    movePipe();
}

// Flap the bird
function flap() {
    if (!gameActive) return;
    birdY -= 40; // Adjust the flap height
    bird.style.top = birdY + "px";
}

// Move the pipe
function movePipe() {
    let pipeHeight = Math.random() * (400 - 100) + 100; // Random height for the pipe
    pipe.style.height = pipeHeight + "px";
    pipe.style.top = (600 - pipeHeight) + "px";

    const pipeInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(pipeInterval);
            return;
        }
        const pipeRight = parseInt(pipe.style.right);
        if (pipeRight > 400) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            pipe.style.right = "-50px"; // Reset pipe position
            clearInterval(pipeInterval);
            movePipe(); // Move the next pipe
        } else {
            pipe.style.right = (pipeRight + 5) + "px"; // Move pipe to the left
        }

        // Check for collision
        if (detectCollision(pipeHeight)) {
            gameOver();
            clearInterval(pipeInterval);
        }
    }, 20);
}

// Detect collision between bird and pipe
function detectCollision(pipeHeight) {
    const birdRect = bird.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();
    return (
        birdRect.left < pipeRect.left + pipeRect.width &&
        birdRect.left + birdRect.width > pipeRect.left &&
        (birdRect.top < pipeRect.top || birdRect.bottom > pipeRect.bottom)
    );
}

// Game over function
function gameOver() {
    gameActive = false;
    alert("Game Over! Your score: " + score);
    restartButton.style.display = "block";
}

// Restart the game
restartButton.addEventListener("click", () => {
    location.reload(); // Reload the page to restart the game
});

// Initialize the game
startGame();
