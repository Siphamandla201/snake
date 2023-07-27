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
    snakeBody : []
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

function update() {
    if (gameOver) {
        return context.fillText("game over : press space button to restart", 180, 50);
        context.font("40px");
    }

    
    // Styling the canvas
    context.fillStyle = 'black';
    context.fillRect(0,0, board.width, board.height);
    
    // styling the food
    context.fillStyle = 'red';
    context.fillRect(food.x,food.y, blockSize, blockSize);
    
    // to check if food is eaten by snake 
    if(snake.x == food.x && snake.y == food.y) {
        snake.snakeBody.push({x: food.x, y: food.y});
        score += 5; 
        placeFood();
    }

    for(let i = snake.snakeBody.length - 1; i > 0; i--) {
        snake.snakeBody[i] = snake.snakeBody[i-1];
    }
    if (snake.snakeBody.length) {
        snake.snakeBody[0] = {x : snake.x, y: snake.y} 
    }
    
    
    context.fillStyle = 'lime';
    snake.x += snake.xv * blockSize;
    snake.y += snake.yv * blockSize;
    context.fillRect(snake.x,snake.y, blockSize, blockSize);

    for(let i = 0; i < snake.snakeBody.length; i++) {
        context.fillRect(snake.snakeBody[i].x, snake.snakeBody[i].y, blockSize, blockSize);
    }
    
    
    // to check for collision between the walls and the snake
    if (snake.x < 0 || snake.x >= board.width) {
        gameOver = true;

        // Reverse the direction
        // snake.xv += snake.xv;  // doesn't work yet // I'll figure it out later
        snake.xv = 0;
    } 

    // Check for collision with top and bottom walls
    if (snake.y < 0 || (snake.y + blockSize) > board.height) {
        gameOver = true;
        snake.xv = 0;
        
        // Reverse the direction
        // snake.y = snake.yv + 4; // doesn't work yet // I'll figure it out later
    }
    
     // to check if the snake bites itself
    for(let i = 0; i < snake.snakeBody.length; i++) {
        if (snake.x == snake.snakeBody[i].x && snake.y == snake.snakeBody[i].y) {
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

function placeFood() {
    food.x = Math.floor(Math.random() * (boardWidth / blockSize)) * blockSize;
    food.y = Math.floor(Math.random() * (boardHeight / blockSize)) * blockSize;
}


function  resetGame() {
    snake.x = boardWidth / 2;
    snake.y = boardHeight / 2;
    
    snake.xv = 0;
    snake.yv = 0;

    gameOver = false;
    snake.snakeBody = [];
    placeFood();
}


// function newGame() {
//     level = 0;
//     lives = gameLives;
//     score = score;
//     ship = newShip();
    
//     // // get the high score from local storage
//     // // let scoreStr = localStorage.getItem(SAVE_KEY_SCORE);
//     // if (scoreStr == null) {
//     //     scoreHigh = 0;
//     // } else {
//     //     scoreHigh = parseInt(scoreStr);
//     // }
    
//     newLevel();
// }


// check for next levels
// if(blockCount == 0) {
//     score += 100*blockRows*blockCol; // bonus points
//     blockRows = Math.min(blockRows + 1, blockMaxRows);
//     createBlocks();
// }