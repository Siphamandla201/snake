const space = document.getElementById("space");
space.width = window.innerWidth;
space.height = window.innerHeight;

const context = space.getContext("2d");

context.fillStyle = "black";
context.fillRect(0, 0, space.width, space.height);

// Set up event handlers to move the ship 
// document.addEventListener("keydown", keyDown);
// document.addEventListener("keyup", keyUp);

class Player {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
    }
    
    drawShip() {
        // // circle to see the center of the canvas
        // context.arc(this.position.shipX, this.position.shipY, 5, 0, Math.PI * 2, false);
        // context.fillStyle = "red";
        // context.fill();

        const shipSize = 30;
        
        // drawing the ship
        context.save(); // Save the current transformation matrix
        context.translate(this.position.shipX, this.position.shipY); // Move the origin to the ship's position
        context.rotate(-Math.PI * 2); // Rotate the ship by -90 degrees (facing upwards)
        
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
        this.position.shipX += this.velocity.velocityX;
        this.position.shipY += this.velocity.velocityY;
    }
}

let ship = new Player({
    position: { shipX: space.width / 2, shipY: space.height / 2 },
    velocity: { velocityX: 0, velocityY: 0 },
});

// function animateShip() {
//     context.clearRect(0, 0, space.width, space.height); // Clear the canvas before drawing
//     ship.updateShip();
//     ship.drawShip();
//     requestAnimationFrame(animateShip); // Request the next animation frame
// }

// animateShip();

// function keyDown(event) {
//     switch (event.code) {
//         case "ArrowRight":
//             ship.velocity.velocityX = 1;
//             break;
//         case "ArrowLeft":
//             ship.velocity.velocityX = -1;
//             break;
//         case "ArrowUp":
//             ship.velocity.velocityY = -1;
//             break;
//         case "ArrowDown":
//             ship.velocity.velocityY = 1;
//             break;
//     }
// }

// function keyUp(event) {
//     switch (event.code) {
//         case "ArrowRight":
//         case "ArrowLeft":
//             ship.velocity.velocityX = 0;
//             break;
//         case "ArrowUp":
//         case "ArrowDown":
//             ship.velocity.velocityY = 0;
//             break;
//     }
// }
