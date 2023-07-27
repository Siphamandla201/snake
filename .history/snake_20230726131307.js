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
let gameLives = 2

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

function newLevel () {
    // code goes here
}

function highScore () {
    // code goes here
}

function liveLeft() {
    if(gameLives > 0) {
        for(letgameLives > 0) {
            gameLives -- ;
            
            snake.x = boardWidth / 2;
            snake.y = boardHeight / 2;
            
            snake.xv = 0;
            snake.yv = 0;
            
            gameOver = false;
            placeFood();
        }
        
        context.font = "40px"; 
        context.fillText(`you have ${gameLives} left` , 180, 50);
        return
    } else {
        gameLives = 2
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
    if (snake.x < 0 ) {
        gameOver = true;
        snake.x = 0;
    } else if (snake.x > board.width) {
        gameOver = true;
        snake.x = board.width - blockSize;
    }
    
    // Check for collision with top and bottom walls
    if (snake.y < 0) {  // Check for collision with top 
        gameOver = true;
        snake.yv = 0; 
        snake.y = 0; // Keep the snake at the top edge of the board
    
    } else if (snake.y + blockSize > board.height) {  // Check for collision bottom walls
        gameOver = true;
        snake.yv = 0;
        snake.y = board.height - blockSize; // Keep the snake at the bottom edge of the board
    
    }

    for(let i = 0; i < snake.snakeBody.length; i++) {
        if (snake.x == snake.snakeBody[i].x && snake.y == snake.snakeBody[i].y) {
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

    // show the score 
    context.font = '20px';
    context.fillStyle = 'white'
    context.fillText(score, 50, 20);
    
    drawSnake();   
    checkAlive();
    liveLeft();
    
    if (gameLives == 0) {
        checkGameOver();
    }
}

function changeDirection(event) {
    if(gameOver) {
        if(event.code == 'Space') {
            resetGame();
        } else if(event.code == 'Enter') {
            liveLeft();
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
    snake.snakeBody = [];
    placeFood();
}


