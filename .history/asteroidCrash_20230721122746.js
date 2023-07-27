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
       context.fillStroke = "white";
    }
}

let ship = new Player ({
    position : {shipY : 0, shipY : 0},
    velocity : {velocityX : 0, vy: 0}
})