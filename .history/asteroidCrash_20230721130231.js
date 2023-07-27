const space = document.getElementById("space");
space.width = window.innerWidth;
space.height = window.innerHeight;

const context = space.getContext("2d");

context.fillStyle = "black";
context.fillRect(0, 0, space.width, space.height);

class Ship {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
    }

    drawShip() {
        const shipX = this.position.shipX;
        const shipY = this.position.shipY;
        const shipSize = 30;

        // drawing the ship
        context.save(); // Save the current transformation matrix
        context.translate(shipX, shipY); // Move the origin to the ship's position
        context.rotate(-Math.PI  2); // Rotate the ship by -90 degrees (facing upwards)

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
}

let ship = new Ship({
    position: { shipX: space.width / 2, shipY: space.height / 2 },
    velocity: { velocityX: 0, velocityY: 0 },
});

ship.drawShip();
