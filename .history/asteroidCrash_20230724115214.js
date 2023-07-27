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
        

  // Get the canvas and context
  var canv = document.getElementById("gameCanvas");
  var ctx = canv.getContext("2d");

  // Game variables
  var level, lives, roids, score, scoreHigh, ship, text, textAlpha;
  newGame();

  // Event handlers
  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  // Game loop
  setInterval(update, 1000 / FPS);

  // Function to create the asteroid belt
  function createAsteroidBelt() {
      // ... implementation ...
  }

  // Function to destroy an asteroid
  function destroyAsteroid(index) {
      // ... implementation ...
  }

  // Function to calculate distance between two points
  function distBetweenPoints(x1, y1, x2, y2) {
      // ... implementation ...
  }

  // Function to draw the ship
  function drawShip(x, y, a, colour = "white") {
      // ... implementation ...
  }

  // Function to explode the ship
  function explodeShip() {
      // ... implementation ...
  }

  // Function to handle game over
  function gameOver() {
      // ... implementation ...
  }

  // Key down event handler
  function keyDown(event) {
      // ... implementation ...
  }

  // Key up event handler
  function keyUp(event) {
      // ... implementation ...
  }

  // Function to create a new asteroid
  function newAsteroid(x, y, r) {
      // ... implementation ...
  }

  // Function to start a new game
  function newGame() {
      // ... implementation ...
  }

  // Function to start a new level
  function newLevel() {
      // ... implementation ...
  }

  // Function to create a new ship
  function newShip() {
      // ... implementation ...
  }

  // Function to shoot a laser
  function shootLaser() {
      // ... implementation ...
  }

  // Function to update the game state
  function update() {
      // ... implementation ...
  }
