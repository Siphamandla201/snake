const space = document.getElementById("space");
space.width = window.innerWidth;
space.height = window.innerHeight;


const context = space.getContext("2d");

context.fillStyle = "black";
context.fillRect(0, 0, space.width, space.height)

class Player {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
    }
    
    drawShip() {
        // circle to see the center of the canvas
        context.arc(this.position.shipX, this.position.shipY, 5, 0, Math.PI * 2, false );
        context.fillStyle = "red";
        context.fill();


        // drawing the ship
        context.beginPath();
        context.moveTo( this.position.shipX = 20, this.position.shipY )
        context.lineTo( this.position.shipX - 10, this.position.shipY - 0 )
        // context.lineTo( this.position.shipX - 30, this.position.shipY + 30 )
        // context.closePath();
        
        // adding styling
        context.strokeStyle = "white"
        context.stroke();
    }
}

let ship = new Player ({
    position : {shipX : space.width / 2, shipY : space.height / 2},
    velocity : {velocityX : 0, velocityY: 0}
})

ship.drawShip();

