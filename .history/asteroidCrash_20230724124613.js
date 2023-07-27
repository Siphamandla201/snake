// Constants
 const FPS = 30; // frames per second
  const FRICTION = 0.7; // friction coefficient of space (0 = no friction, 1 = lots of friction)
  const GAME_LIVES = 3; // starting number of lives
  const LASER_DIST = 0.6; // max distance laser can travel as fraction of screen width
  const LASER_EXPLODE_DUR = 0.1; // duration of the lasers' explosion in seconds
  const LASER_MAX = 10; // maximum number of lasers on screen at once
  const LASER_SPD = 500; // speed of lasers in pixels per second
  const ROID_JAG = 0.4; // jaggedness of the asteroids (0 = none, 1 = lots)
  const ROID_PTS_LGE = 20; // points scored for a large asteroid
  const ROID_PTS_MED = 50; // points scored for a medium asteroid
  const ROID_PTS_SML = 100; // points scored for a small asteroid
  const ROID_NUM = 3; // starting number of asteroids
  const ROID_SIZE = 100; // starting size of asteroids in pixels
  const ROID_SPD = 50; // max starting speed of asteroids in pixels per second
  const ROID_VERT = 10; // average number of vertices on each asteroid
  const SAVE_KEY_SCORE = "highscore"; // save key for local storage of high score
  const SHIP_BLINK_DUR = 0.1; // duration in seconds of a single blink during ship's invisibility
  const SHIP_EXPLODE_DUR = 0.3; // duration of the ship's explosion in seconds
  const SHIP_INV_DUR = 3; // duration of the ship's invisibility in seconds
  const SHIP_SIZE = 30; // ship height in pixels
  const SHIP_THRUST = 5; // acceleration of the ship in pixels per second per second
  const SHIP_TURN_SPD = 360; // turn speed in degrees per second
  const SHOW_BOUNDING = false; // show or hide collision bounding
  const SHOW_CENTRE_DOT = false; // show or hide ship's centre dot
  const TEXT_FADE_TIME = 2.5; // text fade time in seconds
  const TEXT_SIZE = 40; // text font height in pixels

  
  
  
  // Get the canvas and context
  let canvas = document.getElementById("gameCanvas");
  let context = canvas.getContext("2d");
  
  window.onload = function () {
    canvas.width =window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    setInterval(update, 1000 / FPS);
  }
  
//   // Game variables
//   var level, lives, asteroids, score, highScore, ship, text, textAlpha;
//   newGame();
  
//   // Event handlers
//   document.addEventListener("keydown", keyDown);
//   document.addEventListener("keyup", keyUp);



//   // Function to create the asteroid belt
//   function createAsteroidBelt() {
//       // ... implementation ...
//   }

//   // Function to destroy an asteroid
//   function destroyAsteroid(index) {
//       // ... implementation ...
//   }

//   // Function to calculate distance between two points
//   function distBetweenPoints(x1, y1, x2, y2) {
//       // ... implementation ...
//   }
  
let ship = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    a : 90 / 180 * Math.PI,
    r : SHIP_SIZE / 2,
    blinkNum: Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR),
    blinkTime: Math.ceil(SHIP_BLINK_DUR * FPS),
    canShoot: true,
    dead: false,
    explodeTime: 0,
    lasers: [],
    rot: 0,
    thrusting: false,
    thrust: {
        x: 0,
        y: 0
    }
  }

  // Function to draw the ship
//   function drawShip() {
    
//   }

//   // Function to explode the ship
//   function explodeShip() {
//       // ... implementation ...
//   }

//   // Function to handle game over
//   function gameOver() {
//       // ... implementation ...
//   }

  // Key down event handler
  function keyDown(event) {
      switch(event.code) {
        case 'ArrowUp' :
        break
        case 'ArrowRight' :
        break
        case 'ArrowLeft' :
        break
      }
  }

  // Key up event handler
  function keyUp(event) {
    switch(event.code) {
        case 'ArrowUp' :
        break
        case 'ArrowRight' :
        break
        case 'ArrowLeft' :
        break
      }
  }

//   // Function to create a new asteroid
//   function newAsteroid(x, y, r) {
//       // ... implementation ...
//   }

//   // Function to start a new game
//   function newGame() {
//       // ... implementation ...
//   }

//   // Function to start a new level
//   function newLevel() {
//       // ... implementation ...
//   }

//   // Function to create a new ship
//   function newShip() {
//       // ... implementation ...
//   }

//   // Function to shoot a laser
//   function shootLaser() {
//       // ... implementation ...
//   }
  
  // Function to update the game state
  function update() {

    // drawing ship
    context.strokeStyle = "white";
    context.lineWidth = SHIP_SIZE / 30;
    context.beginPath();
    context.moveTo( // nose of the ship
        ship.x + ship.r * Math.cos(ship.a),
        ship.y - ship.r * Math.sin(ship.a)
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

    // thrust the ship
    if (ship.thrusting && !ship.dead) {
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;
    

    // draw the thruster
    // if (!exploding && blinkOn) {
        context.fillStyle = "red"
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
//     } else {
//     // apply friction (slow the ship down when not thrusting)
//     ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
//     ship.thrust.y -= FRICTION * ship.thrust.y / FPS; 
    // } 

  }


  update();
