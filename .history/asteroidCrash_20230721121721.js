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
       context.fillStyle = "white";
       context.fillRect(this.position.x, this.position.y, 100, 100);
    }
}

let ship = new Player ({
    position : {x : 0, x : 0},
    velocity : {vx : 0, vy: 0}
})

ship.drawShip();