// Get the canvas and its 2D rendering context
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Constants for controlling the game behavior
const SPEED = 3;
const ROTATIONAL_SPEED = 0.05;
const FRICTION = 0.97;
const PROJECTILE_SPEED = 3;

// Arrays to store projectiles and asteroids
const projectiles = [];
const asteroids = [];

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Class representing the player's ship
class Player {
  constructor({ position, velocity }) {
    this.position = position; // {x, y}
    this.velocity = velocity;
    this.rotation = 0;
  }

  // Method to draw the player's ship
  draw() {
    const shipX = this.position.x;
    const shipY = this.position.y;
    c.save();

    // Translate and rotate the canvas context to draw the ship in the correct position
    c.translate(shipX, shipY);
    c.rotate(this.rotation + -1.6);
    c.translate(-shipX, -shipY);

    // Draw the ship as a triangle
    c.beginPath();
    c.moveTo(this.position.x + 30, this.position.y);
    c.lineTo(this.position.x - 10, this.position.y - 10);
    c.lineTo(this.position.x - 10, this.position.y + 10);
    c.closePath();

    c.strokeStyle = 'white';
    c.stroke();
    c.restore();
  }

  // Method to update the player's ship position and draw it
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  // Method to get the vertices of the ship (used for collision detection)
  getVertices() {
    const cos = Math.cos(this.rotation);
    const sin = Math.sin(this.rotation);

    return [
      {
        x: this.position.x + cos * 30 - sin * 0,
        y: this.position.y + sin * 30 + cos * 0,
      },
      {
        x: this.position.x + cos * -10 - sin * 10,
        y: this.position.y + sin * -10 + cos * 10,
      },
      {
        x: this.position.x + cos * -10 - sin * -10,
        y: this.position.y + sin * -10 + cos * -10,
      },
    ];
  }
}

// Class representing a projectile
class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 5;
  }

  // Method to draw the projectile
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    c.closePath();
    c.fillStyle = 'white';
    c.fill();
  }

  // Method to update the projectile position and draw it
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

// Class representing an asteroid
class Asteroid {
  constructor({ position, velocity, radius }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
  }

  // Method to draw the asteroid
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    c.closePath();
    c.strokeStyle = 'white';
    c.stroke();
  }

  // Method to update the asteroid position and draw it
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

// Create the player's ship instance
const player = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: { x: 0, y: 0 },
});

// Object to keep track of which keys are pressed
const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

// Interval to create new asteroids at regular intervals
const intervalId = window.setInterval(() => {
  // Randomly select a side of the screen for asteroid spawn
  const index = Math.floor(Math.random() * 4);
  let x, y;
  let vx, vy;
  let radius = 50 * Math.random() + 10;

  switch (index) {
    case 0: // left side of the screen
      x = 0 - radius;
      y = Math.random() * canvas.height;
      vx = 1;
      vy = 0;
      break;
    case 1: // bottom side of the screen
      x = Math.random() * canvas.width;
      y = canvas.height + radius;
      vx = 0;
      vy = -1;
      break;
    case 2: // right side of the screen
      x = canvas.width + radius;
      y = Math.random() * canvas.height;
      vx = -1;
      vy = 0;
      break;
    case 3: // top side of the screen
      x = Math.random() * canvas.width;
      y = 0 - radius;
      vx = 0;
      vy = 1;
      break;
  }

  // Create and add a new asteroid to the asteroids array
  asteroids.push(
    new Asteroid({
      position: {
        x: x,
        y: y,
      },
      velocity: {
        x: vx,
        y: vy,
      },
      radius,
    })
  );

}, 3000);

// Function to check collision between two circles
function circleCollision(circle1, circle2) {
  const xDifference = circle2.position.x - circle1.position.x;
  const yDifference = circle2.position.y - circle1.position.y;

  const distance = Math.sqrt(
    xDifference * xDifference + yDifference * yDifference
  );

  if (distance <= circle1.radius + circle2.radius) {
    return true;
  }

  return false;
}

// Function to check collision between a circle and a triangle
function circleTriangleCollision(circle, triangle) {
  // Check if the circle is colliding with any of the triangle's edges
  for (let i = 0; i < 3; i++) {
    let start = triangle[i];
    let end = triangle[(i + 1) % 3];

    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let length = Math.sqrt(dx * dx + dy * dy);

    let dot =
      ((circle.position.x - start.x) * dx +
        (circle.position.y - start.y) * dy) /
      Math.pow(length, 2);

    let closestX = start.x + dot * dx;
    let closestY = start.y + dot * dy;

    if (!isPointOnLineSegment(closestX, closestY, start, end)) {
      closestX = closestX < start.x ? start.x : end.x;
      closestY = closestY < start.y ? start.y : end.y;
    }

    dx = closestX - circle.position.x;
    dy = closestY - circle.position.y;

    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= circle.radius) {
      return true;
    }
  }

  // No collision
  return false;
}

// Function to check if a point is on a line segment
function isPointOnLineSegment(x, y, start, end) {
  return (
    x >= Math.min(start.x, end.x) &&
    x <= Math.max(start.x, end.x) &&
    y >= Math.min(start.y, end.y) &&
    y <= Math.max(start.y, end.y)
  );
}

// Main game loop function
function animate() {
  const animationId = window.requestAnimationFrame(animate);

  // Clear the canvas and set its background color
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);

  // Update and draw the player's ship
  player.update();

  // Update and draw projectiles, and handle garbage collection
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i];
    projectile.update();

    // Remove projectiles that are outside the canvas
    if (
      projectile.position.x + projectile.radius < 0 ||
      projectile.position.x - projectile.radius > canvas.width ||
      projectile.position.y - projectile.radius > canvas.height ||
      projectile.position.y + projectile.radius < 0
    ) {
      projectiles.splice(i, 1);
    }
  }

  // Update and draw asteroids, handle collisions and garbage collection
  for (let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i];
    asteroid.update();

    // Check for collision with the player's ship
    if (circleTriangleCollision(asteroid, player.getVertices())) {
      console.log('GAME OVER');
      window.cancelAnimationFrame(animationId);
      clearInterval(intervalId);
    }

    // Remove asteroids that are outside the canvas
    if (
      asteroid.position.x + asteroid.radius < 0 ||
      asteroid.position.x - asteroid.radius > canvas.width ||
      asteroid.position.y - asteroid.radius > canvas.height ||
      asteroid.position.y + asteroid.radius < 0
    ) {
      asteroids.splice(i, 1);
    }

    // Check for collision with projectiles and remove both if there is a collision
    for (let j = projectiles.length - 1; j >= 0; j--) {
      const projectile = projectiles[j];

      if (circleCollision(asteroid, projectile)) {
        asteroids.splice(i, 1);
        projectiles.splice(j, 1);
      }
    }
  }

  // Check if the 'w' key is pressed for ship movement
  if (keys.w.pressed) {
    player.velocity.x = Math.cos(player.rotation) * SPEED;
    player.velocity.y = Math.sin(player.rotation) * SPEED;
  } else if (!keys.w.pressed) {
    // Apply friction if the 'w' key is not pressed
    player.velocity.x *= FRICTION;
    player.velocity.y *= FRICTION;
  }

  // Check if 'd' or 'a' keys are pressed for ship rotation
  if (keys.d.pressed) player.rotation += ROTATIONAL_SPEED;
  else if (keys.a.pressed) player.rotation -= ROTATIONAL_SPEED;
}

// Start the game loop
animate();

// Event listener for keydown to handle ship movement and shooting
window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowUp':
      keys.w.pressed = true;
      break;
    case 'ArrowLeft':
      keys.a.pressed = true;
      break;
    case 'ArrowRight':
      keys.d.pressed = true;
      break;
    case 'Space':
      // Shoot a projectile when the Space key is pressed
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + Math.cos(player.rotation) * 30,
            y: player.position.y + Math.sin(player.rotation) * 30,
          },
          velocity: {
            x: Math.cos(player.rotation) * PROJECTILE_SPEED,
            y: Math.sin(player.rotation) * PROJECTILE_SPEED,
          },
        })
      );
      break;
  }
});

// Event listener for keyup to handle ship movement
window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'ArrowUp':
      keys.w.pressed = false;
      break;
    case 'ArrowLeft':
      keys.a.pressed = false;
      break;
    case 'ArrowRight':
      keys.d.pressed = false;
      break;
  }
});
