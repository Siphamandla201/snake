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
            this.position.shipX
        )
    }
}

let ship = new Player ({
    position : {shipY : space.width / 2, shipY : space.height / 2},
    velocity : {velocityX : 0, velocityY: 0}
})