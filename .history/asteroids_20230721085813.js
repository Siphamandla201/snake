// Setting up constants for the game
const fps = 30; // Frames Per Second
const friction = 0.4; // Friction to slow down the ship when not thrusting
const turnSpeed = 360; // Turn speed in degrees per second
const shipAccel = 5; // Ship's base speed
const ShipSize = 55; // Ship's height in pixels
const astroidNum = 12; // Number of astroids
const astroidSpeed = 50; // Max speed of astroids in frames per second
const astroidsize = 100; // Max starting size of astroids in pixels
const astroidVertex = 10; // Number of vertices on each astroid
const astroidJagged = 0.5;
const showBounding = false;
const shipExplodeTime = 0.1;
const SHIP_BLINK_DUR = 0.1; // duration in seconds of a single blink during ship's invisibility
const SHIP_EXPLODE_DUR = 0.3; // duration of the ship's explosion in seconds
const SHIP_INV_DUR = 3; // duration of the ship's invisibility in seconds

// Creating the board, boardHeight, and boardWidth variables
let board = document.getElementById('board');
let boardHeight = window.innerHeight;
let boardWidth = window.innerWidth;

// The board layout
board.height = boardHeight;
board.width = boardWidth;
let context = board.getContext("2d");

// Creating the ship
let ship = newShip(); 

let astroids = [];

// Function called when the window loads
window.onload = () => {
    // Setting up keyboard events
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    createAstroidBelt();

    // Setting up a loop and calling the Update function to update the board every 30 seconds
    setInterval(Update, 1000 / fps);
};

function Update() {
    let blinkOn = ship.blinkNum % 2 === 0;
    let exploding = ship.explode > 0;

    // Drawing the board
    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);
    
    // Draw astroids
    let x, y, r, a, vertex, offset;
    for (let i = 0; i < astroids.length; i++) {
        x = astroids[i].x;
        y = astroids[i].y;
        r = astroids[i].r;
        a = astroids[i].a;
        vertex = astroids[i].vertex;
        offset = astroids[i].offset;

        context.beginPath();
        context.lineWidth = ShipSize / 20;
        context.strokeStyle = "grey";
        context.moveTo(
            x + r * offset[0] * Math.cos(a),
            y + r * offset[0] * Math.sin(a)
        );

        for (let j = 1; j < vertex; j++) {
            context.lineTo(
                x + r * offset[j] * Math.cos(a + j * Math.PI * 2 / vertex),
                y + r * offset[j] * Math.sin(a + j * Math.PI * 2 / vertex)
            );
        }
        context.closePath();
        context.stroke();

        if (showBounding) {
            context.strokeStyle = "red";
            context.beginPath();
            context.arc(x, y, r, 0, Math.PI * 2, false);
            context.closePath()
            context.stroke();
        }
    }

    if (!exploding) {
        if (blinkOn) {
            // Drawing the ship
            context.strokeStyle = "white";
            context.lineWidth = ShipSize / 40;
            context.beginPath();

            // Calculate the coordinates for the three points of the triangle
            let shipFrontX = ship.x + ship.r * Math.cos(ship.a); // Nose of the ship
            let shipFrontY = ship.y - ship.r * Math.sin(ship.a);
            let shipRearRightX = ship.x - ship.r * (Math.cos(ship.a) * 0.5 + Math.sin(ship.a) * 0.866); // Rear right
            let shipRearRightY = ship.y + ship.r * (Math.sin(ship.a) * 0.5 - Math.cos(ship.a) * 0.866);
            let shipRearLeftX = ship.x - ship.r * (Math.cos(ship.a) * 0.5 - Math.sin(ship.a) * 0.866); // Rear left
            let shipRearLeftY = ship.y + ship.r * (Math.sin(ship.a) * 0.5 + Math.cos(ship.a) * 0.866);

            // Drawing lines to create the ship triangle
            context.moveTo(shipFrontX, shipFrontY);          // Move to the nose of the ship
            context.lineTo(shipRearRightX, shipRearRightY); // Draw line to the rear right of the ship
            context.lineTo(shipRearLeftX, shipRearLeftY);   // Draw line to the rear left of the ship
            context.closePath();                            // Close the path to complete the triangle
            context.stroke();                              // Draw the ship outline
        }

        // handle blinking
        if (ship.blinkNum > 0) {
            // reduce the blink time
            ship.blinkTime--;

            // reduce the blink num
            if (ship.blinkTime === 0) {
                ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * fps);
                ship.blinkNum--;
            }
        }
    } else {
        context.fillStyle = 'darkred';
        context.beginPath();
        context.arc(ship.x, ship.y, ship.r * 1.7, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
        
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(ship.x, ship.y, ship.r * 1.4, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();

        context.fillStyle = 'orange';
        context.beginPath();
        context.arc(ship.x, ship.y, ship.r * 1.1, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();

        context.fillStyle = 'yellow';
        context.beginPath();
        context.arc(ship.x, ship.y, ship.r * 0.9, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();

        context.fillStyle = 'white';
        context.beginPath();
        context.arc(ship.x, ship.y, ship.r * 0.6, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
    }

    if (showBounding) {
        context.strokeStyle = "red";
        context.beginPath();
        context.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
        context.closePath()
        context.stroke();
    }
    
    // Thrust 
    if (ship.thrust) {
        // Calculate the thrust acceleration based on ship's angle
        let thrustAccelX = shipAccel * Math.cos(ship.a);
        let thrustAccelY = shipAccel * Math.sin(ship.a);

        // Apply the thrust acceleration to the ship's velocity
        ship.velocity.x += thrustAccelX / 50;
        ship.velocity.y -= thrustAccelY / 50;

        if (!exploding) {
            // Drawing thrust
            context.fillStyle = "red"; // Set the fill color to red
            context.strokeStyle = "orange";
            context.lineWidth = ShipSize / 20;
            context.beginPath();

            // Calculate the offset to move the thrust to the bottom of the ship
            let thrustOffsetX = ship.r * Math.cos(ship.a);  // The horizontal offset from the center of the ship
            let thrustOffsetY = ship.r * Math.sin(ship.a); // The vertical offset from the center of the ship

            // Calculate the coordinates for the three points of the triangle (thrust)
            let thrustFrontX = ship.x - thrustOffsetX / 0.75; // Nose of the ship (thrust front)
            let thrustFrontY = ship.y + thrustOffsetY / 0.75;

            // Calculate the thrust rear points based on ship's angle
            let thrustRearRightX = ship.x + ship.r * (Math.cos(ship.a) * 0.4 + Math.sin(ship.a) * 0.5) - thrustOffsetX; // Rear right
            let thrustRearRightY = ship.y - ship.r * (Math.sin(ship.a) * 0.4 - Math.cos(ship.a) * 0.5) + thrustOffsetY;

            let thrustRearLeftX = ship.x + ship.r * (Math.cos(ship.a) * 0.4 - Math.sin(ship.a) * 0.5) - thrustOffsetX; // Rear left
            let thrustRearLeftY = ship.y - ship.r * (Math.sin(ship.a) * 0.4 + Math.cos(ship.a) * 0.5) + thrustOffsetY;

            // Drawing lines to create the thrust triangle
            context.moveTo(thrustFrontX, thrustFrontY);          // Move to the nose of the ship (thrust front)
            context.lineTo(thrustRearRightX, thrustRearRightY); // Draw line to the rear right of the ship (thrust rear right)
            context.lineTo(thrustRearLeftX, thrustRearLeftY);   // Draw line to the rear left of the ship (thrust rear left)
            context.closePath();                            // Close the path to complete the triangle
            context.fill();                                 // Fill the triangle with the red color
            context.stroke();                              // Draw the ship outline
        }
    
    } else {
        ship.velocity.x -= friction * ship.velocity.x / fps;
        ship.velocity.y += friction * ship.velocity.y / fps;  
    }

    if (!exploding) {
        // only check when not blinking
        if (ship.blinkNum === 0) {
            for (let i = 0; i < astroids.length; i++) {
                if (distanceBetween(ship.x, ship.y, astroids[i].x, astroids[i].y) < ship.r + astroids[i].r) {
                    explodeShip();
                }
            }
        }
        // Rotate the ship
        ship.a += ship.rotate;
        
        // Move the ship
        context.fillStyle = 'red';
        context.fillRect(ship.x - 1, ship.y - 1, 2, 2);
        ship.x += ship.velocity.x;
        ship.y += ship.velocity.y;

        // Handle screen sides
        if (ship.x < 0 - ship.r) { // For the left side
            ship.x = board.width + ship.r;
        } else if (ship.x > board.width + ship.r) { // For the right side
            ship.x = 0 - ship.r;
        }

        if (ship.y < 0 - ship.r) { // For the top side
            ship.y = board.height + ship.r;
        } else if (ship.y > board.height + ship.r) { // For the bottom side
            ship.y = 0 - ship.r;
        }
    } else {
        ship.explode--;

        if (ship.explode === 0) {
            ship.blinkNum = Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR);
            ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * fps);
            ship = newShip();
        }
    } 

    for (let i = 0; i < astroids.length; i++) {
        // Moving the astroids
        astroids[i].x += astroids[i].xvelocity;
        astroids[i].y += astroids[i].yvelocity;
    
        // handling the screen edge for astriods
        if (astroids[i].x < 0 - astroids[i].r) {
            astroids[i].x = board.width + astroids[i].r;
        } else if (astroids[i].x > board.width + astroids[i].r) {
            astroids[i].x = 0 - astroids[i].r;
        }
    
        if (astroids[i].y < 0 - astroids[i].r) {
            astroids[i].y = board.height + astroids[i].r;
        } else if (astroids[i].y > board.height + astroids[i].r) {
            astroids[i].y = 0 - astroids[i].r;
        }

        // collision handling
        if (distanceBetween(ship.x, ship.y, astroids[i].x, astroids[i].y) < ship.r + astroids[i].r) {
            explodeShip();
        }
    }
}

function newShip() {
    return {
        x: board.width / 2,
        y: board.height / 2,
        r: ShipSize / 2,
        a: 90 / 180 * Math.PI, // Convert into radians
        rotate: 0,
        thrust: false,
        blinkNum: Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR),
        blinkTime: Math.ceil(SHIP_BLINK_DUR * fps),
        explode: 0,
        velocity: {
            x: 0,
            y: 0
        }
    }; 
}

function explodeShip() {
    ship.explode = Math.ceil(SHIP_EXPLODE_DUR * fps);
}

// Function to create the astroid belt
function createAstroidBelt() {
    astroids = [];
    let x , y;
    for (let i = 0; i < astroidNum; i++) {
        do {
            x = Math.floor(Math.random() * board.width);
            y = Math.floor(Math.random() * board.height);
        } while (distanceBetween(ship.x, ship.y, x, y) < astroidsize * 2 + ship.r);
        astroids.push(newAstroid(x, y));
    }
}

function distanceBetween(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

// Function to create a new asteroid
function newAstroid(x, y) {
    let astroid = {
        x: x,
        y: y,
        xvelocity: Math.random() * astroidSpeed / fps * (Math.random() < 0.5 ? 1 : -1),
        yvelocity: Math.random() * astroidSpeed / fps * (Math.random() < 0.5 ? 1 : -1),
        r: astroidsize / 2,
        a: Math.random() * Math.PI * 2,
        vertex: Math.floor(Math.random() * (astroidVertex * 2 + 1) + astroidVertex / 2),
        offset: []
    };
    
    for (let i = 0; i < astroid.vertex; i++) {
        astroid.offset.push(Math.random() * astroidJagged * 2 + 1 - astroidJagged); // Use astroid.offset.push to add values to the offset array
    }
    return astroid;
}

// Function to handle keydown events
function keyDown(event) {
    switch(event.code) {
        case 'ArrowRight':
            ship.rotate = (turnSpeed / 180) * Math.PI / fps;
            break;
        case 'ArrowLeft':
            ship.rotate = -(turnSpeed / 180) * Math.PI / fps;
            break;
        case 'ArrowUp':
            ship.thrust = true;
            break;
    }
} 

// Function to handle keyup events
function keyUp(event) {
    switch(event.code) {
        case 'ArrowRight':
        case 'ArrowLeft':
            ship.rotate = 0;
            break;
        case 'ArrowUp':
            ship.thrust = false;
            break;
    }
}
