  // Constants
  const FPS = 30; // frames per second

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
