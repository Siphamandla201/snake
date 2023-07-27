const space = document.getElementById("space");
space.width = window.innerWidth;
space.height = window.innerHeight;


const context = space.getContext("2d");

context.fillStyle = "black";
context.fillRect(0, 0, space.width, space.height)

class Player {
    constructor({position, velocity}) {
        this.position = position,
        this.velocity = velocity
    }
    
    drawShip() {
        context.beginPath();
        context.moveTo(
            this.position.shipX + 15,
            this.position.shipY + 15
        )
        context.lineTo(
            this.position.shipX - 8,
            this.position.shipY - 8
        )
        context.lineTo(
            this.position.shipX + 8,
            this.position.shipY + 8
        )
        contex
    }
}

let ship = new Player ({
    position : {shipX : space.width / 2, shipY : space.height / 2},
    velocity : {velocityX : 0, velocityY: 0}
})