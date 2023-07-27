const blockSize = 25;
const board = document.getElementById('board');
const context = board.getContext("2d");
const boardHeight = 500;
const boardWidth = 500;


let snake = {
    x : boardWidth / 2,
    y : boardHeight / 2,
    xv : 0,
    yv : 0,
    snakeBody : [],

}

// food
let food = {
    x : blockSize * 5,
    y : blockSize * 5, 
}

// Game lives
let gameLives = 3

// Score
let score = 0;

// Game Over
let gameOver = false;

window.onload = function () {
    board.height = boardHeight;
    board.width = boardWidth;
    
    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/8);
} 
let alive = true

function checkGameOver() {
    if (gameOver) {
        context.font = "40px"; // Set the font size before using context.fillText()
        context.fillText("game over : press space button to restart", 180, 50);
        return;
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * (boardWidth / blockSize)) * blockSize;
    food.y = Math.floor(Math.random() * (boardHeight / blockSize)) * blockSize;
}

function eatFood(){
    // to check if food is eaten by snake 
    if(snake.x == food.x && snake.y == food.y) {
        snake.snakeBody.push({x: food.x, y: food.y});
        score += 5; 
        placeFood();
    }
    
    // Removes food from frame
    for(let i = snake.snakeBody.length - 1; i > 0; i--) {
        snake.snakeBody[i] = snake.snakeBody[i-1];
    }
    if (snake.snakeBody.length) {
        snake.snakeBody[0] = {x : snake.x, y: snake.y} 
    }
}

function drawSnake() {
    context.fillStyle = 'lime';
    
    context.fillRect(snake.x,snake.y, blockSize, blockSize);
    for(let i = 0; i < snake.snakeBody.length; i++) {
        context.fillRect(snake.snakeBody[i].x, snake.snakeBody[i].y, blockSize, blockSize);
    }
}

function checkAlive() {
    // Check for collision with left and right walls
    if (snake.x < 0 || snake.x + blockSize > board.width) {
        gameOver = true;
    }
    
    // Check for collision with top and bottom walls
    if (snake.y < 0 || snake.y + blockSize > board.height) {
        gameOver = true;
    }

    for(let i = 0; i < snake.snakeBody.length; i++) {
        if (snake.x === snake.snakeBody[i].x && snake.y === snake.snakeBody[i].y) {
            gameOver = true;
        }
    }
}


function update() {
    
    // Styling the canvas
    context.fillStyle = 'black';
    context.fillRect(0,0, board.width, board.height);
    
    // styling the food
    context.fillStyle = 'red';
    context.fillRect(food.x,food.y, blockSize, blockSize);
    
    eatFood()
    
    if (!gameOver) {
        snake.x += snake.xv * blockSize;
        snake.y += snake.yv * blockSize;
    }

    drawSnake()    
    checkAlive()
    
    // show the score 
    context.font = '20px';
    context.fillText(score, 50, 20);
    checkGameOver()


}

function changeDirection(event) {
    if(gameOver) {
        if(event.code == 'Space') {
            resetGame();
        } else if(event.code == 'Enter') {
            resetGame();
        }
    }
    if(event.code == "ArrowUp" && snake.yv != 1 ) {
        snake.xv = 0;
        snake.yv = -1;
    } else if(event.code == "ArrowDown" && snake.yv != -1 ) {
        snake.xv = 0;
        snake.yv = 1;
    } else if(event.code == "ArrowRight" && snake.xv != -1) {
        snake.xv = 1;
        snake.yv = 0;
    } else if(event.code == "ArrowLeft" && snake.xv !=  1) {
        snake.xv = -1;
        snake.yv = 0;
    }
} 


function  resetGame() {
    snake.x = boardWidth / 2;
    snake.y = boardHeight / 2;
    
    snake.xv = 0;
    snake.yv = 0;
    
    gameOver = false;
    alive = true
    snake.snakeBody = [];
    placeFood();
}

