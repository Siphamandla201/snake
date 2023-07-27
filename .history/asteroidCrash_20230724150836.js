const FPS = 30; // frames per second
const FRICTION = 0.7; // friction coefficient of space (0 = no friction, 1 = lots of friction)
const SHIP_SIZE = 30; // ship height in pixels
const SHIP_THRUST = 5; // acceleration of the ship in pixels per second per second
const TURN_SPEED = 360; // turn speed in degrees per second
const ASTEROID_JAG = 0.4; // jaggedness of the asteroids (0 = none, 1 = lots)
const ASTEROID_NUM = 3; // starting number of asteroids
const ASTEROID_SIZE = 100; // starting size of asteroids in pixels
const ASTEROID_SPD = 50; // max starting speed of asteroids in pixels per second
const ASTEROID_VERT = 10; // average number of vertices on each asteroid

var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// set up the spaceship object
var ship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: SHIP_SIZE / 2,
    a: 90 / 180 * Math.PI, // convert to radians
    rot: 0,
    thrusting: false,
    thrust: {
        x: 0,
        y: 0
    }
}

 // set up asteroids
 var asteroids = [];
 createAsteroidBelt();
 
 // set up event handlers
 document.addEventListener("keydown", keyDown);
 document.addEventListener("keyup", keyUp);
 
 // set up the game loop
 setInterval(update, 1000 / FPS);
 

function createAsteroidBelt() {
    asteroids = [];
    var x, y;
    for (var i = 0; i < ASTEROID_NUM; i++) {
        // random asteroid location (not touching spaceship)
        do {
            x = Math.floor(Math.random() * canv.width);
            y = Math.floor(Math.random() * canv.height);
        } while (distBetweenPoints(ship.x, ship.y, x, y) < ASTEROID_SIZE * 2 + ship.r);
        asteroids.push(newAsteroid(x, y));
    }
}

function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// set up event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// set up the game loop
setInterval(update, 1000 / FPS);

function keyDown(event) {
    switch(event.keyCode) {
        case 37: // left arrow (rotate ship left)
            ship.rot = TURN_SPEED / 180 * Math.PI / FPS;
            break;
        case 38: // up arrow (thrust the ship forward)
            ship.thrusting = true;
            break;
        case 39: // right arrow (rotate ship right)
            ship.rot = -TURN_SPEED / 180 * Math.PI / FPS;
            break;
    }
}

function keyUp(event) {
    switch(event.keyCode) {
        case 37: // left arrow (stop rotating left)
            ship.rot = 0;
            break;
        case 38: // up arrow (stop thrusting)
            ship.thrusting = false;
            break;
        case 39: // right arrow (stop rotating right)
            ship.rot = 0;
            break;
    }
}

function newAsteroid(x, y) {
    var roid = {
        a: Math.random() * Math.PI * 2, // in radians
        offs: [],
        r: ROID_SIZE / 2,
        vert: Math.floor(Math.random() * (ROID_VERT + 1) + ROID_VERT / 2),
        x: x,
        y: y,
        xv: Math.random() * ROID_SPD / FPS * (Math.random() < 0.5 ? 1 : -1),
        yv: Math.random() * ROID_SPD / FPS * (Math.random() < 0.5 ? 1 : -1)
    };

    // populate the offsets array
    for (var i = 0; i < roid.vert; i++) {
        roid.offs.push(Math.random() * ROID_JAG * 2 + 1 - ROID_JAG);
    }
    
    return roid;
}


function update() {
    // draw space
    context.fillStyle = "black";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // thrust the ship
    if (ship.thrusting) {
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;

        // draw the thruster
        context.fillStyle = "red";
        context.strokeStyle = "yellow";
        context.lineWidth = SHIP_SIZE / 10;
        context.beginPath();
        context.moveTo( // rear left
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
        );
        context.lineTo( // rear centre (behind the ship)
            ship.x - ship.r * 5 / 3 * Math.cos(ship.a),
            ship.y + ship.r * 5 / 3 * Math.sin(ship.a)
        );
        context.lineTo( // rear right
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
        );
        context.closePath();
        context.fill();
        context.stroke();
    } else {
        // apply friction (slow the ship down when not thrusting)
        ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
        ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
    }

    // draw the triangular ship
    context.strokeStyle = "white";
    context.lineWidth = SHIP_SIZE / 20;
    context.beginPath();
    context.moveTo( // nose of the ship
        ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
        ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
    );
    context.lineTo( // rear left
        ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
    );
    context.lineTo( // rear right
        ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
        ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
    );
    context.closePath();
    context.stroke();
                
     // draw the asteroids
    ctx.strokeStyle = "slategrey";
    ctx.lineWidth = SHIP_SIZE / 20;
    var a, r, x, y, offs, vert;
        for (var i = 0; i < roids.length; i++) {
                    
            // get the asteroid properties
            a = roids[i].a;
            r = roids[i].r;
            x = roids[i].x;
            y = roids[i].y;
            offs = roids[i].offs;
            vert = roids[i].vert;
                    
            // draw the path
            ctx.beginPath();
            ctx.moveTo(
                x + r * offs[0] * Math.cos(a),
                y + r * offs[0] * Math.sin(a)
            );
                    
            // draw the polygon
            for (var j = 1; j < vert; j++) {
                ctx.lineTo(
                    x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
                    y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
                );
            }
            ctx.closePath();
            ctx.stroke();
                    
            // move the asteroid
            roids[i].x += roids[i].xv;
            roids[i].y += roids[i].yv;
            
            // handle asteroid edge of screen
            if (roids[i].x < 0 - roids[i].r) {
                roids[i].x = canv.width + roids[i].r;
            } else if (roids[i].x > canv.width + roids[i].r) {
                        roids[i].x = 0 - roids[i].r
            }
            if (roids[i].y < 0 - roids[i].r) {
                roids[i].y = canv.height + roids[i].r;
            } else if (roids[i].y > canv.height + roids[i].r) {
                roids[i].y = 0 - roids[i].r
            }
                }
                
    
    // rotate the ship
    ship.a += ship.rot;

    // move the ship
    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;
    
    // handle edge of screen
    if (ship.x < 0 - ship.r) {
        ship.x = canvas.width + ship.r;
    } else if (ship.x > canvas.width + ship.r) {
        ship.x = 0 - ship.r;
    }
    if (ship.y < 0 - ship.r) {
        ship.y = canvas.height + ship.r;
    } else if (ship.y > canvas.height + ship.r) {
        ship.y = 0 - ship.r;
    }
    
    //centre dot (optional)
    context.fillStyle = "red";
    context.fillRect(ship.x - 1, ship.y - 1, 3, 3);
}
