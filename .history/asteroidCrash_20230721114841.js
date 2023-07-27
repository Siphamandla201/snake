const space = document.getElementById("space");
space.width = window.innerWidth;
space.height = window.innerHeight;
const context = space.getContext("2d");

context.fillStyle = "black";
context.fillRect