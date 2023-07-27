const space = document.getElementById("space");
const context = space.getContext("2d");

function resizeCanvas() {
    space.width = window.innerWidth;
    space.height = window.innerHeight;
}

resizeCanvas(); // Initial setup

window.addEventListener("resize", resizeCanvas); // Listen for window resize

// Set up event handlers to move the ship 
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

class Player {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.rotate = 0;
    }
    
        drawShip() {
            const shipX = this.position.shipX;
            const shipY = this.position.shipY;
            const shipSize = 30;
    
            // circle to see the center of the canvas
            context.arc(shipX, shipY, 5, 0, Math.PI * 2, false);
            context.strokeStyle = "red";
            context.stroke();
    
            // drawing the ship
            context.save(); // Save the current transformation matrix
            context.translate(shipX, shipY); // Move the origin to the ship's position
            context.rotate(this.rotate);
    
            context.fillStyle = "white";
            context.beginPath();
            context.moveTo(0, -shipSize / 2);
            context.lineTo(-shipSize / 2, shipSize / 2);
            context.lineTo(shipSize / 2, shipSize / 2);
            context.closePath();
    
            // adding styling
            context.strokeStyle = "white";
            context.stroke();
            
            context.restore(); // Restore the original transformation matrix
        }
    
    
    updateShip() {
        this.drawShip();
        this.position.shipX += this.velocity.velocityX;
        this.position.shipY += this.velocity.velocityY;
    }
}

let ship = new Player({
    position: { shipX: space.width / 2, shipY: space.height / 2 },
    velocity: { velocityX: 0, velocityY: 0 },
});

const buttons = {
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

function animateShip() {
    context.fillStyle = "black";
    context.fillRect(0, 0, space.width, space.height);
    
    ship.velocity.velocityX = 0;
    ship.rotate = 0; // Set rotation to 0 before checking arrow key events
    
    if (buttons.ArrowRight.pressed == true) {
        ship.rotate = Math.PI * 0.1; // Rotate ship clockwise by 1 degree (adjust as needed)
        // ship.velocity.velocityX = 1;
    } else if (buttons.ArrowLeft.pressed == true) {
        // ship.velocity.velocityX = -1;
        ship.rotate = -Math.PI * 1; // Rotate ship anti-clockwise by 1 degree (adjust as needed)
    } 
    
    ship.velocity.velocityY = 0;
    if (buttons.ArrowUp.pressed == true) {
        ship.velocity.velocityY = -1;
    }
    
    ship.updateShip();
}


function keyDown(event) {
    switch (event.code) {
        case "ArrowRight":
            buttons.ArrowRight.pressed = true;
            break;
        case "ArrowLeft":
            buttons.ArrowLeft.pressed = true;
            break;
        case "ArrowUp":
            buttons.ArrowUp.pressed = true;
            break;
    } 
}

        



function keyUp(event) {
    switch (event.code) {
        case "ArrowRight":
            buttons.ArrowRight.pressed = false;
            break;
        case "ArrowLeft":
            buttons.ArrowLeft.pressed = false;
            break;
        case "ArrowUp":
            buttons.ArrowUp.pressed = false;
            break;
    }
}

function gameLoop() {
    animateShip();
    requestAnimationFrame(gameLoop);
}

gameLoop(); // Start the animation loop

