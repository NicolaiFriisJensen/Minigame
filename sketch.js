let state;
let ball = {
  x: 0,
  y: 0,
  speed: 5,
  velX: 5,
  velY: 5,
  diameter: 35,
  score: 0,
};
let bat = {
  x: 150,
  y: 450,
  velX: 0,
  velY: 0,
  speed: 4,
  arrowLeft: 37,
  arrowRight: 39,
  w: 80,
  h: 35,
};

function setup() {
  createCanvas(350, 500);
  state = "game";

  bat.arrowLeft = LEFT_ARROW;
  bat.arrowRight = RIGHT_ARROW;
}

function draw() {
  if (state == "game") {
    drawGame();
  }
  if (state == "game over") {
    drawGameOver();
  }
}

function drawGame() {
  background("cyan");
  drawAndMoveBall();
  drawAndMoveBat();
  drawScore();
}

function drawGameOver() {
  background("white");
  textSize(35);
  textFont("helvetica");
  text("Game Over", 170, 200);
  textSize(20);
  text("Press P to play again", 170, 300);
  if (keyIsDown(80)) {
    state = "game";
    resetValues();
  }
}

function drawAndMoveBall() {
  circle(ball.x, ball.y, ball.diameter);

  ball.x = ball.x + ball.velX;
  ball.y = ball.y + ball.velY;

  ///bounce top///
  if (ball.y < 0) {
    ball.velY = -ball.velY;
  }

  ///edges of the screen///
  if (ball.x < 0 || ball.x > width) {
    ball.velX = -ball.velX;
  }

  ///collisions with bat///
  if (
    ball.y > bat.y &&
    ball.y < bat.y + bat.h &&
    ball.x > bat.x &&
    ball.x < bat.x + bat.w
  ) {
    ball.velY = ball.velY * -1;
    ball.score = ball.score + 1;
  }
  if (
    ball.y > bat.y &&
    ball.y < bat.y + bat.w &&
    ball.x > bat.y &&
    ball.x < bat.y + bat.h
  ) {
    ball.velY = ball.velY * -1;
  }
  if (ball.y > 550) {
    state = "game over";
  }
}

function drawAndMoveBat() {
  rect(bat.x, bat.y, bat.w, bat.h);

  bat.x = bat.x + bat.velX;
  bat.velX = 0;
  
  if(keyIsDown(bat.arrowLeft)){
    bat.velX = -bat.speed;
  }
  if(keyIsDown(bat.arrowRight)){
    bat.velX = bat.speed;
  }
}

function resetValues(){
  ball.x = 0;
  ball.y = 0;
  ball.velX = 5;
  ball.velY = 5;

  bat.x = 150;
  ball.score = 0;
}

function drawScore(){
  textAlign(CENTER);
  textFont("helvetica");
  textSize(25);
  text(ball.score,170,40);
 
}