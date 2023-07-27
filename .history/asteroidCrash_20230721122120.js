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
       context.fillStyle = "red";
       context.fillRect(this.position.x, , 100, 100);
    //    context.fillRect(100, 100, 100, 100);
    }
}

let ship = new Player ({
    position : {x : space.width / 2, x : space.height / 2},
    velocity : {vx : 0, vy: 0}
})

ship.drawShip();