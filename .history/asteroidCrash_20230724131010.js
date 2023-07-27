        const FRICTION = 0.7; // friction coefficient of space (0 = no friction, 1 = lots of friction)
        const ASTEROID_JAGGE = 0.4; // jaggedness of the asteroids (0 = none, 1 = lots)
        const ASTEROID_NUM = 3; // starting number of asteroids
        const ASTEROID_SIZE = 100; // starting size of asteroids in pixels
        const ASTEROID_SPD = 50; // max starting speed of asteroids in pixels per second
        const ASTEROID_VERT = 10; // average number of vertices on each asteroid
        const SHIP_BLINK_DURATION = 0.1; // duration in seconds of a single blink during ship's invisibility
        const SHIP_EXPLODE_DURATION = 0.3; // duration of the ship's explosion in seconds
        const SHIP_INV_DURATION = 3; // duration of the ship's invisibility in seconds
        const SHIP_SIZE = 30; // ship height in pixels
        const SHIP_THRUST = 5; // acceleration of the ship in pixels per second per second
        const SHIP_TURN_SPEED = 360; // turn speed in degrees per second
        const SHOW_BOUNDING = false; // show or hide collision bounding
        const SHOW_CENTRE_DOT = false; // show or hide ship's centre dot

        /** @type {HTMLCanvasElement} */
        var canvas = document.getElementById("gameCanvas");
        var context = canvas.getContext("2d");

        // set up the spaceship object
        var ship = newShip();

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
                    x = Math.floor(Math.random() * canvas.width);
                    y = Math.floor(Math.random() * canvas.height);
                } while (distBetweenPoints(ship.x, ship.y, x, y) < ASTEROID_SIZE * 2 + ship.r);
                asteroids.push(newAsteroid(x, y));
            }
        }

        function distBetweenPoints(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        }

        function explodeShip() {
            ship.explodeTime = Math.ceil(SHIP_EXPLODE_DURATION * FPS);
        }

        function keyDown(/** @type {KeyboardEvent} */ ev) {
            switch(ev.keyCode) {
                case 37: // left arrow (rotate ship left)
                    ship.rot = SHIP_TURN_SPEED / 180 * Math.PI / FPS;
                    break;
                case 38: // up arrow (thrust the ship forward)
                    ship.thrusting = true;
                    break;
                case 39: // right arrow (rotate ship right)
                    ship.rot = -SHIP_TURN_SPEED / 180 * Math.PI / FPS;
                    break;
            }
        }

        function keyUp(/** @type {KeyboardEvent} */ ev) {
            switch(ev.keyCode) {
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
                x: x,
                y: y,
                xv: Math.random() * ASTEROID_SPD / FPS * (Math.random() < 0.5 ? 1 : -1),
                yv: Math.random() * ASTEROID_SPD / FPS * (Math.random() < 0.5 ? 1 : -1),
                a: Math.random() * Math.PI * 2, // in radians
                r: ASTEROID_SIZE / 2,
                offs: [],
                vert: Math.floor(Math.random() * (ASTEROID_VERT + 1) + ASTEROID_VERT / 2)
            };

            // populate the offsets array
            for (var i = 0; i < roid.vert; i++) {
                roid.offs.push(Math.random() * ASTEROID_JAGGE * 2 + 1 - ASTEROID_JAGGE);
            }

            return roid;
        }

        function newShip() {
            return {
                x: canvas.width / 2,
                y: canvas.height / 2,
                a: 90 / 180 * Math.PI, // convert to radians
                r: SHIP_SIZE / 2,
                blinkNum: Math.ceil(SHIP_INV_DURATION / SHIP_BLINK_DURATION),
                blinkTime: Math.ceil(SHIP_BLINK_DURATION * FPS),
                explodeTime: 0,
                rot: 0,
                thrusting: false,
                thrust: {
                    x: 0,
                    y: 0
                }
            }
        }

        function update() {
            var blinkOn = ship.blinkNum % 2 == 0;
            var exploding = ship.explodeTime > 0;

            // draw space
            context.fillStyle = "black";
            context.fillRect(0, 0, canvas.width, canvas.height);

            // draw the asteroids
            var a, r, x, y, offs, vert;
            for (var i = 0; i < asteroids.length; i++) {
                context.strokeStyle = "slategrey";
                context.lineWidth = SHIP_SIZE / 20;

                // get the asteroid properties
                a = asteroids[i].a;
                r = asteroids[i].r;
                x = asteroids[i].x;
                y = asteroids[i].y;
                offs = asteroids[i].offs;
                vert = asteroids[i].vert;
                
                // draw the path
                context.beginPath();
                context.moveTo(
                    x + r * offs[0] * Math.cos(a),
                    y + r * offs[0] * Math.sin(a)
                );

                // draw the polygon
                for (var j = 1; j < vert; j++) {
                    context.lineTo(
                        x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
                        y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
                    );
                }
                context.closePath();
                context.stroke();

                // show asteroid's collision circle
                if (SHOW_BOUNDING) {
                    context.strokeStyle = "lime";
                    context.beginPath();
                    context.arc(x, y, r, 0, Math.PI * 2, false);
                    context.stroke();
                }
            }
            
            // thrust the ship
            if (ship.thrusting) {
                ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
                ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;

                // draw the thruster
                if (!exploding && blinkOn) {
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
                }
            } else {
                // apply friction (slow the ship down when not thrusting)
                ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
                ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
            }
            
            // draw the triangular ship
            if (!exploding) {
                if (blinkOn) {
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
                }

                // handle blinking
                if (ship.blinkNum > 0) {
                    
                    // reduce the blink time
                    ship.blinkTime--;

                    // reduce the blink num
                    if (ship.blinkTime == 0) {
                        ship.blinkTime = Math.ceil(SHIP_BLINK_DURATION * FPS);
                        ship.blinkNum--;
                    }
                }
            } else {
                // draw the explosion (concentric circles of different colours)
                context.fillStyle = "darkred";
                context.beginPath();
                context.arc(ship.x, ship.y, ship.r * 1.7, 0, Math.PI * 2, false);
                context.fill();
                context.fillStyle = "red";
                context.beginPath();
                context.arc(ship.x, ship.y, ship.r * 1.4, 0, Math.PI * 2, false);
                context.fill();
                context.fillStyle = "orange";
                context.beginPath();
                context.arc(ship.x, ship.y, ship.r * 1.1, 0, Math.PI * 2, false);
                context.fill();
                context.fillStyle = "yellow";
                context.beginPath();
                context.arc(ship.x, ship.y, ship.r * 0.8, 0, Math.PI * 2, false);
                context.fill();
                context.fillStyle = "white";
                context.beginPath();
                context.arc(ship.x, ship.y, ship.r * 0.5, 0, Math.PI * 2, false);
                context.fill();
            }

            // show ship's collision circle
            if (SHOW_BOUNDING) {
                context.strokeStyle = "lime";
                context.beginPath();
                context.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
                context.stroke();
            }
            
            // show ship's centre dot
            if (SHOW_CENTRE_DOT) {
                context.fillStyle = "red";
                context.fillRect(ship.x - 1, ship.y - 1, 2, 2);
            }

            // check for asteroid collisions (when not exploding)
            if (!exploding) {

                // only check when not blinking
                if (ship.blinkNum == 0) {
                    for (var i = 0; i < asteroids.length; i++) {
                        if (distBetweenPoints(ship.x, ship.y, asteroids[i].x, asteroids[i].y) < ship.r + asteroids[i].r) {
                            explodeShip();
                        }
                    }
                }
                
                // rotate the ship
                ship.a += ship.rot;

                // move the ship
                ship.x += ship.thrust.x;
                ship.y += ship.thrust.y;
            } else {
                // reduce the explode time
                ship.explodeTime--;
                
                // reset the ship after the explosion has finished
                if (ship.explodeTime == 0) {
                    ship = newShip();
                }
            }

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

            // move the asteroids
            for (var i = 0; i < asteroids.length; i++) {
                asteroids[i].x += asteroids[i].xv;
                asteroids[i].y += asteroids[i].yv;
                
                // handle asteroid edge of screen
                if (asteroids[i].x < 0 - asteroids[i].r) {
                    asteroids[i].x = canvas.width + asteroids[i].r;
                } else if (asteroids[i].x > canvas.width + asteroids[i].r) {
                    asteroids[i].x = 0 - asteroids[i].r
                }
                if (asteroids[i].y < 0 - asteroids[i].r) {
                    asteroids[i].y = canvas.height + asteroids[i].r;
                } else if (asteroids[i].y > canvas.height + asteroids[i].r) {
                    asteroids[i].y = 0 - asteroids[i].r
                }
            }
        }
