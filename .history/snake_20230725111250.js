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
    board.height = window.innerHeight / 1.7;
    board.width = window.innerWidth / 2.5;
    

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
    if (snake.x < 0 || snake.x > board.width || snake.y < 0 || snake.y > board.height) {
        gameOver = true;
        // context.font("20px");
        alert("")
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
    food.x = Math.floor(Math.random() * board.width) * blockSize;
    food.y = Math.floor(Math.random() * board.height) * blockSize;
}


function  resetGame() {
    snake.x = blockSize * 5;
    snake.y = blockSize * 5;
    
    snake.xv = 0;
    snake.yv = 0;

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