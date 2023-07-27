// Board

let board;
let boardWidth = 500;
let boardHeigth = 500;
let context;

// Player 
let playerWidth = 100;
let playerHeight = 10;

// Player Velocity
let playerVelocityX = 10;

let player = {
    x : boardWidth/2 - playerWidth/2,
    y : boardHeigth - playerHeight - 5,
    width : playerWidth,
    height : playerHeight,
    velocityX : playerVelocityX
}


// Ball
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3;
let ballVelocityY = 3;

let ball = {
    x : boardWidth/2,
    y : boardHeigth/3,
    width : ballWidth,
    height : ballHeight,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY
}

// blocks
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockCol = 8;
let blockRows = 3;
let blockMaxRows = 10;
let blockCount = 0;

// starting block corners
let blockX =15;
let blockY =45;

// Score Board
let score = 0;

// game over
let gameOver = false;



window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeigth;
    board.width = boardWidth;
    context = board.getContext("2d");

    context.fillStyle = 'skyblue';
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);

    createBlocks();
 
}

function update() {
    requestAnimationFrame(update);
    //Clears the previous frame and create new one
    context.clearRect(0, 0, board.width, board.height);

    if(gameOver) {
        return context.fillText("game over : press space button to restart", 180, 50);
    }

    // Player
    context.fillStyle = 'skyblue';
    context.fillRect(player.x, player.y, player.width, player.height);

    // Ball
    context.fillStyle = 'white';
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // Make the ball bounces
    if(ball.y <= 0 ) {
        // if the ball touches the top 
        ball.velocityY *= -1;
    } else if(ball.x <= 0 || (ball.x + ball.width) >= boardWidth) {
        // if the ball touches the left or right side
        ball.velocityX *= -1;
    } else if(ball.y + ball.height >= boardHeigth) {
        // if the ball touches the bottom
        // alert("game over")
        context.font = "1.5rem";
        gameOver = true;
        
    }

    if(topCollision(ball,player) || bottomCollision(ball, player)) {
       ball.velocityY *= -1; 
    }else if(leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.velocityX *= -1;
    }

    // Blocks
    context.fillStyle = 'skyblue';
    for(let i =0; i< blockArray.length; i++) {
        let block = blockArray[i];
        if(!block.break) {
            if(topCollision(ball, block) || bottomCollision(ball, block)) {
                block.break = true;
                ball.velocityY *= -1;
                blockCount -=1;
                score += 100;
            }else if(leftCollision(ball, block) || rightCollision(ball, block)){
                block.break = true;
                ball.velocityX *= -1;
                blockCount -=1;
                score += 100;

            }
            context.fillRect(block.x, block.y, block.width, block.height);   
        }
    }

    // check for next levels
    if(blockCount == 0) {
        score += 100*blockRows*blockCol; // bonus points
        blockRows = Math.min(blockRows + 1, blockMaxRows);
        createBlocks();
    }

    // show the score 
    context.font = '20px';
    context.fillText(score, 10, 20);

}

function outOfBounds(xPosition) {
    return(xPosition < 0 || xPosition + playerWidth > boardWidth);
}


function movePlayer(event) {
    if(gameOver) {
        if(event.code == 'Space') {
          resetGame();   
        }
    }

    if(event.code == 'ArrowLeft') {
        // player.x -= player.velocityX;
        let nextPlayerX = player.x - player.velocityX
        if(!outOfBounds(nextPlayerX)) {
            player.x = nextPlayerX * 1;
        }
    } else if (event.code == 'ArrowRight') {
        // player.x += player.velocityX
        let nextPlayerX = player.x + player.velocityX
        if(!outOfBounds(nextPlayerX)) {
            player.x = nextPlayerX * 1;
        }
    }

}

function detectCollision(a,b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.width && 
           a.y + a.height > b.y;

}


function topCollision(ball, block) {
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block) {
    return detectCollision(ball, block) && ( block.y + block.height) >= ball.y;
}

function leftCollision(ball, block) {
    return detectCollision(ball, block) && ( ball.x + ball.width) >= block.x;
}

function rightCollision(ball, block) {
    return detectCollision(ball, block) && ( block.x + block.width) >= ball.x;
}

function createBlocks() {
    blockArray = [];
    for(let c = 0; c < blockCol; c++ ) {
        for(let r = 0; r < blockRows; r++) {
            let block = {
                x : blockX + c*blockWidth + c*10,
                y : blockY + r*blockHeight + r*10,
                width : blockWidth,
                height : blockHeight,
                break : false
            };
            blockArray.push(block); 
        }
    }
    blockCount = blockArray.length;
}


function  resetGame() {
    gameOver = false;
    player = {
        x : boardWidth/2 - playerWidth/2,
        y : boardHeigth - playerHeight - 5,
        width : playerWidth,
        height : playerHeight,
        velocityX : playerVelocityX
    }

        
    ball = {
        x : boardWidth/2,
        y : boardHeigth/2,
        width : ballWidth,
        height : ballHeight,
        velocityX : ballVelocityX,
        velocityY : ballVelocityY
    }

    blockArray = [];
    blockRows = 3;
    score = 0;
    createBlocks();
}