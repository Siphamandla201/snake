// Board 
let blockSize = 25;
let rows = 20;
let col = 20;
let board;
let context;

// Snake Head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

// Game lives


// Score
let score = 0;

// Game Over
let gameOver = false;


// food

let foodX;
let foodY; 

window.onload = function () {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/8);
} 

function update() {
    if (gameOver) {
        return context.fillText("game over : press space button to restart", 180, 50);
    }

    
    // Styling the canvas
    context.fillStyle = 'black';
    context.fillRect(0,0, board.width, board.height);

    // styling the food
    context.fillStyle = 'red';
    context.fillRect(foodX,foodY, blockSize, blockSize);

    // to check if food is eaten by snake 
    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push({x: foodX, y: foodY});
        score += 100; 
        placeFood();
    }

    for(let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = {x : snakeX, y: snakeY} 
    }


    context.fillStyle = 'lime';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX,snakeY, blockSize, blockSize);

    for(let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i].x, snakeBody[i].y, blockSize, blockSize);
    }


    // to check for collision between the walls and the snake
    if (snakeX < 0 || snakeX > col * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        context.font("20px");
    }

     // to check if the snake bites itself
    for(let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i].x && snakeY == snakeBody[i].y) {
            gameOver = true;
            context.font("20px");
        }
    }

    // show the score 
    context.font = '20px';
    context.fillText(score, 50, 20);


}

function changeDirection(event) {
    if(gameOver) {
        if(event.code == 'Space') {
            resetGame();
        }
    }
    if(event.code == "ArrowUp" && velocityY != 1 ) {
        velocityX = 0;
        velocityY = -1;
    } else if(event.code == "ArrowDown" && velocityY != -1 ) {
        velocityX = 0;
        velocityY = 1;
    } else if(event.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } else if(event.code == "ArrowLeft" && velocityX !=  1) {
        velocityX = -1;
        velocityY = 0;
    }
} 

function placeFood() {
    foodX = Math.floor(Math.random() * col) * blockSize;
    foodY = Math.floor(Math.random() * col) * blockSize;
}


function  resetGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;

    velocityX = 0;
    velocityY = 0;

    gameOver = false;
    snakeBody = [];
    placeFood();
}