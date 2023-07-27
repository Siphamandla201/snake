// // Define constants for the game
// const FPS = 30; // frames per second
// const FRICTION = 0.7; // friction coefficient of space (0 = no friction, 1 = lots of friction)
// const ROID_JAG = 0.4; // jaggedness of the asteroids (0 = none, 1 = lots)
// const ROID_NUM = 3; // starting number of asteroids
// const ROID_SIZE = 100; // starting size of asteroids in pixels
// const ROID_SPD = 50; // max starting speed of asteroids in pixels per second
// const ROID_VERT = 10; // average number of vertices on each asteroid
const SHIP_BLINK_DUR = 0.1; // duration in seconds of a single blink during ship's invisibility
const SHIP_EXPLODE_DUR = 0.3; // duration of the ship's explosion in seconds
const SHIP_INV_DUR = 3; // duration of the ship's invisibility in seconds
const SHIP_SIZE = 30; // ship height in pixels
const SHIP_THRUST = 5; // acceleration of the ship in pixels per second per second
const SHIP_TURN_SPD = 360; // turn speed in degrees per second
const SHOW_BOUNDING = false; // show or hide collision bounding
const SHOW_CENTRE_DOT = false; // show or hide ship's center dot

// // Get the canvas and its context
let board = document.getElementById("board");
let context = board.getContext("2d");

// Set up the spaceship object
// let ship = newShip();

// // Set up asteroids
// let asteroids = [];
// createAsteroidBelt();

// Set up event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Set up the game loop
// setInterval(update, 1000 / FPS);

// // Function to create the initial asteroid belt
// function createAsteroidBelt() {
//     asteroids = [];
//     let x, y;
//     for (let i = 0; i < ROID_NUM; i++) {
//         // Random asteroid location (not touching spaceship)
//         do {
//             x = Math.floor(Math.random() * board.width);
//             y = Math.floor(Math.random() * board.height);
//         } while (distBetweenPoints(ship.x, ship.y, x, y) < ROID_SIZE * 2 + ship.r);
//         asteroids.push(newAsteroid(x, y));
//     }
// }

// // Function to calculate the distance between two points
// function distBetweenPoints(x1, y1, x2, y2) {
//     return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
// }

// // Function to handle the ship explosion
// function explodeShip() {
//     ship.explodeTime = Math.ceil(SHIP_EXPLODE_DUR * FPS);
// }

// Event handler for key down events
function keyDown(event) {
    switch (event.keyCode) {
        case 37: // left arrow (rotate ship left)
            ship.rot = SHIP_TURN_SPD / 180 * Math.PI / FPS;
            break;
        case 38: // up arrow (thrust the ship forward)
            ship.thrusting = true;
            break;
        case 39: // right arrow (rotate ship right)
            ship.rot = -SHIP_TURN_SPD / 180 * Math.PI / FPS;
            break;
    }
}

// Event handler for key up events
function keyUp(event) {
    switch (event.keyCode) {
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

// // Function to create a new asteroid object
// function newAsteroid(x, y) {
//     let asteroid = {
//         x: x,
//         y: y,
//         xv: Math.random() * ROID_SPD / FPS * (Math.random() < 0.5 ? 1 : -1),
//         yv: Math.random() * ROID_SPD / FPS * (Math.random() < 0.5 ? 1 : -1),
//         a: Math.random() * Math.PI * 2, // in radians
//         r: ROID_SIZE / 2,
//         offs: [],
//         vert: Math.floor(Math.random() * (ROID_VERT + 1) + ROID_VERT / 2)
//     };

//     // Populate the offsets array
//     for (let i = 0; i < asteroid.vert; i++) {
//         asteroid.offs.push(Math.random() * ROID_JAG * 2 + 1 - ROID_JAG);
//     }

//     return asteroid;
// }

// // Function to create a new ship object
function newShip() {
    return {
        x: board.width / 2,
        y: board.height / 2,
        a: 90 / 180 * Math.PI, // convert to radians
        r: SHIP_SIZE / 2,
        blinkNum: Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR),
        blinkTime: Math.ceil(SHIP_BLINK_DUR * FPS),
        explodeTime: 0,
        rot: 0,
        thrusting: false,
        thrust: {
            x: 0,
            y: 0
        }
    };
}

// // Function to update the game state
// function update() {
//     let blinkOn = ship.blinkNum % 2 == 0;
//     let exploding = ship.explodeTime > 0;
// Draw the space
    context.fillStyle = "black";
    board.width = window.innerWidth;
    board.height = window.innerHeight;
    context.fillRect(0, 0, board.width, board.height);
    
//     // Draw the asteroids
//     let a, r, x, y, offs, vert;
//     for (let i = 0; i < asteroids.length; i++) {
//         context.strokeStyle = "slategrey";
//         context.lineWidth = SHIP_SIZE / 20;

//         // Get the asteroid properties
//         a = asteroids[i].a;
//         r = asteroids[i].r;
//         x = asteroids[i].x;
//         y = asteroids[i].y;
//         offs = asteroids[i].offs;
//         vert = asteroids[i].vert;

//         // Draw the path
//         context.beginPath();
//         context.moveTo(
//             x + r * offs[0] * Math.cos(a),
//             y + r * offs[0] * Math.sin(a)
//         );

//         // Draw the polygon
//         for (let j = 1; j < vert; j++) {
//             context.lineTo(
//                 x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
//                 y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
//             );
//         }
//         context.closePath();
//         context.stroke();

//         // Show asteroid's collision circle
//         if (SHOW_BOUNDING) {
//             context.strokeStyle = "lime";
//             context.beginPath();
//             context.arc(x, y, r, 0, Math.PI * 2, false);
//             context.stroke();
//         }
//     }

//     // Thrust the ship
//     if (ship.thrusting) {
//         ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
//         ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;

//         // Draw the thruster
//         if (!exploding && blinkOn) {
//             context.fillStyle = "red";
//             context.strokeStyle = "yellow";
//             context.lineWidth = SHIP_SIZE / 10;
//             context.beginPath();
//             context.moveTo( // rear left
//                 ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
//                 ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
//             );
//             context.lineTo( // rear centre (behind the ship)
//                 ship.x - ship.r * 5 / 3 * Math.cos(ship.a),
//                 ship.y + ship.r * 5 / 3 * Math.sin(ship.a)
//             );
//             context.lineTo( // rear right
//                 ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
//                 ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
//             );
//             context.closePath();
//             context.fill();
//             context.stroke();
//         }
//     } else {
//         // Apply friction (slow the ship down when not thrusting)
//         ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
//         ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
//     }

    // // Draw the triangular ship
    // if (!exploding) {
    //     if (blinkOn) {
    //         context.strokeStyle = "white";
    //         context.lineWidth = SHIP_SIZE / 20;
    //         context.beginPath();
    //         context.moveTo( // nose of the ship
    //             ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
    //             ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
    //         );
    //         context.lineTo( // rear left
    //             ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
    //             ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
    //         );
    //         context.lineTo( // rear right
    //             ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
    //             ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
    //         );
    //         context.closePath();
    //         context.stroke();
    //     }

//         // Handle blinking
//         if (ship.blinkNum > 0) {
//             // Reduce the blink time
//             ship.blinkTime--;

//             // Reduce the blink num
//             if (ship.blinkTime == 0) {
//                 ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS);
//                 ship.blinkNum--;
//             }
//         }
//     } else {
//         // Draw the explosion (concentric circles of different colors)
//         context.fillStyle = "darkred";
//         context.beginPath();
//         context.arc(ship.x, ship.y, ship.r * 1.7, 0, Math.PI * 2, false);
//         context.fill();
//         context.fillStyle = "red";
//         context.beginPath();
//         context.arc(ship.x, ship.y, ship.r * 1.4, 0, Math.PI * 2, false);
//         context.fill();
//         context.fillStyle = "orange";
//         context.beginPath();
//         context.arc(ship.x, ship.y, ship.r * 1.1, 0, Math.PI * 2, false);
//         context.fill();
//         context.fillStyle = "yellow";
//         context.beginPath();
//         context.arc(ship.x, ship.y, ship.r * 0.8, 0, Math.PI * 2, false);
//         context.fill();
//         context.fillStyle = "white";
//         context.beginPath();
//         context.arc(ship.x, ship.y, ship.r * 0.5, 0, Math.PI * 2, false);
//         context.fill();
//     }

//     // Show ship's collision circle
//     if (SHOW_BOUNDING) {
//         context.strokeStyle = "lime";
//         context.beginPath();
//         context.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
//         context.stroke();
//     }

//     // Show ship's center dot
//     if (SHOW_CENTRE_DOT) {
//         context.fillStyle = "red";
//         context.fillRect(ship.x - 1, ship.y - 1, 2, 2);
//     }

//     // Check for asteroid collisions (when not exploding)
//     if (!exploding) {
//         // Only check when not blinking
//         if (ship.blinkNum == 0) {
//             for (let i = 0; i < asteroids.length; i++) {
//                 if (distBetweenPoints(ship.x, ship.y, asteroids[i].x, asteroids[i].y) < ship.r + asteroids[i].r) {
//                     explodeShip();
//                 }
//             }
//         }

//         // Rotate the ship
//         ship.a += ship.rot;

//         // Move the ship
//         ship.x += ship.thrust.x;
//         ship.y += ship.thrust.y;
//     } else {
//         // Reduce the explode time
//         ship.explodeTime--;

//         // Reset the ship after the explosion has finished
//         if (ship.explodeTime == 0) {
//             ship = newShip();
//         }
//     }

//     // Handle edge of screen
//     if (ship.x < 0 - ship.r) {
//         ship.x = board.width + ship.r;
//     } else if (ship.x > board.width + ship.r) {
//         ship.x = 0 - ship.r;
//     }
//     if (ship.y < 0 - ship.r) {
//         ship.y = board.height + ship.r;
//     } else if (ship.y > board.height + ship.r) {
//         ship.y = 0 - ship.r;
//     }

//     // Move the asteroids
//     for (let i = 0; i < asteroids.length; i++) {
//         asteroids[i].x += asteroids[i].xv;
//         asteroids[i].y += asteroids[i].yv;

//         // Handle asteroid edge of screen
//         if (asteroids[i].x < 0 - asteroids[i].r) {
//             asteroids[i].x = board.width + asteroids[i].r;
//         } else if (asteroids[i].x > board.width + asteroids[i].r) {
//             asteroids[i].x = 0 - asteroids[i].r;
//         }
//         if (asteroids[i].y < 0 - asteroids[i].r) {
//             asteroids[i].y = board.height + asteroids[i].r;
//         } else if (asteroids[i].y > board.height + asteroids[i].r) {
//             asteroids[i].y = 0 - asteroids[i].r;
//         }
//     }
// }
