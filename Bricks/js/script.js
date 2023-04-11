var inputDevice = localStorage.getItem("input-dcvice");

// Initialize canvas and context
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
//settings
var moveKeys = true;//if false move mouse
//variables game
const ballRadius = 10;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
let score = 0;
//paddle
const paddleHeight = 10;
const paddleWidth = 175;
let paddleX = (canvas.width - paddleWidth) / 2;
//paddle movement
let rightPressed = false;
let leftPressed = false;
//mouse movement 
var canvasMinX;
var canvasMaxX;
//brick settings
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 150;
const brickHeight = 30;
const brickPadding = 30;
const brickOffsetTop = 10;
const brickOffsetLeft = 150;
//2d array for bricks
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
//timer part
let timerInterval;
let seconds = 0;
let minutes = 0;
const timerElement = document.getElementById("time");

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}
startTimer()
function stopTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  minutes = 0;
  timerElement.innerHTML = "00:00";
}

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  timerElement.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
}

if(inputDevice=="mouse"){
  document.addEventListener("mousemove", mouseMoveHandler, false);
}


//keyboard movement
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//bricks...
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          drawScore()
          if (score === brickRowCount * brickColumnCount) {
           // alert("YOU WIN, CONGRATULATIONS!");
            //document.location.reload();
            //clearInterval(interval); // Needed for Chrome to end game
            stopTimer()
			Swal.fire({
			icon: 'success', 
			title: 'Good job!'
			})
          }
        }
      }
    }
  }
}

function drawScore() {
  document.getElementById("score").innerHTML = score
}




function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}


function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

//draw paddle
function paddle() {
  ctx.beginPath();
  ctx.rect(paddleX, HEIGHT - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;
console.log(canvas.height, canvas.width)



//draw circle
function circle(x, y, ballRadius) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}
function draw() {
  //clear canvas each time 
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawBricks()
  circle(x, y, ballRadius)
  if (!moveKeys) {
    mouse();
  }
  paddle()
  collisionDetection()
  drawScore()

  if (x + dx > WIDTH - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
     // alert("GAME OVER");
      //document.location.reload();
      clearInterval(interval); // Needed for Chrome to end game
      stopTimer()
    }
  }

  x += dx;
  y += dy;
  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  }
  else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  x += dx;
  y += dy;
}



const interval = setInterval(draw, 10);