const blockSize = 25;
const board = document.getElementById('board');
const context = board.getContext("2d");


let snake = {
    x : blockSize * 5,
    y : blockSize * 5,
    xv : 0,
    yv : 0,
    snakeBody : []
}

// food
let food = {
    foodX : blockSize * 5,
    foodY : blockSize * 5, 
}

// Game lives
let gameLives = 3

// Score
let score = 0;

// Game Over
let gameOver = false;




window.onload = function () {
    board.height = window.o;
    board.width = col * blockSize;
    

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


function newGame() {
    level = 0;
    lives = gameLives;
    score = score;
    ship = newShip();
    
    // // get the high score from local storage
    // // let scoreStr = localStorage.getItem(SAVE_KEY_SCORE);
    // if (scoreStr == null) {
    //     scoreHigh = 0;
    // } else {
    //     scoreHigh = parseInt(scoreStr);
    // }
    
    newLevel();
}


// check for next levels
// if(blockCount == 0) {
//     score += 100*blockRows*blockCol; // bonus points
//     blockRows = Math.min(blockRows + 1, blockMaxRows);
//     createBlocks();
// }