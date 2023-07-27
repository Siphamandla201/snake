
}

// function isPointOnLineSegment(x, y, start, end) {
//   return (
//     x >= Math.min(start.x, end.x) &&
//     x <= Math.max(start.x, end.x) &&
//     y >= Math.min(start.y, end.y) &&
//     y <= Math.max(start.y, end.y)
//   )
// }

// function animate() {
//   const animationId = window.requestAnimationFrame(animate)
//   c.fillStyle = 'black'
//   c.fillRect(0, 0, canvas.width, canvas.height)
  
//   player.update()
  
//   for (let i = projectiles.length - 1; i >= 0; i--) {
//     const projectile = projectiles[i]
//     projectile.update()

//     // garbage collection for projectiles
//     if (
//       projectile.position.x + projectile.radius < 0 ||
//       projectile.position.x - projectile.radius > canvas.width ||
//       projectile.position.y - projectile.radius > canvas.height ||
//       projectile.position.y + projectile.radius < 0
//     ) {
//       projectiles.splice(i, 1)
//     }
//   }

  // asteroid management
//   for (let i = asteroids.length - 1; i >= 0; i--) {
//     const asteroid = asteroids[i]
//     asteroid.update()

    // if (circleTriangleCollision(asteroid, player.getVertices())) {
    //   window.cancelAnimationFrame(animationId);
    //   clearInterval(intervalId)
    // }

    // garbage collection for projectiles
    // if (
    //   asteroid.position.x + asteroid.radius < 0 ||
    //   asteroid.position.x - asteroid.radius > canvas.width ||
    //   asteroid.position.y - asteroid.radius > canvas.height ||
    //   asteroid.position.y + asteroid.radius < 0
    // ) {
    //   asteroids.splice(i, 1);
    // }
    
//     // projectiles
//     for (let j = projectiles.length - 1; j >= 0; j--) {
//       const projectile = projectiles[j];

//       if (circleCollision(asteroid, projectile)) {
//         asteroids.splice(i, 1);
//         projectiles.splice(j, 1);
//       }
//     }
//   }

  if (keys.w.pressed) {
    player.velocity.x = Math.cos(player.rotation) * SPEED
    player.velocity.y = Math.sin(player.rotation) * SPEED
  } else if (!keys.w.pressed) {
    player.velocity.x *= FRICTION
    player.velocity.y *= FRICTION
  }

  if (keys.d.pressed) player.rotation += ROTATIONAL_SPEED
  else if (keys.a.pressed) player.rotation -= ROTATIONAL_SPEED
}

animate()


// To start animation
window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW':
      keys.w.pressed = true;
      break
    case 'KeyA':
      keys.a.pressed = true;
      break
    case 'KeyD':
      keys.d.pressed = true;
      break
    case 'Space':
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
      )

      break
  }
})


// Stop animation when key is not pressed
window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW':
      keys.w.pressed = false;
      break
    case 'KeyA':
      keys.a.pressed = false;
      break
    case 'KeyD':
      keys.d.pressed = false;
      break
  }
})