// sketch.js
let man;
let gravity = 0.6;
let jumpForce = 10;
let isJumping = false;
let isMoving = {
  'w': false,
  'a': false,
  's': false,
  'd': false
};
let jumpSound;


  
  function soundLoaded() {
    console.log("Sound loaded successfully");
  }

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  man = new Man();
}

function draw() {
  background(220);

  // Render the 3D shapes
  push();
  translate(0, -100, 0);
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(70, 70, 70);
  pop();

  // Update and render the man
  man.update();
  man.show();
}

function keyPressed() {
  if (key === ' ') {
    if (!isJumping) {
      man.jump();
      // Play the jump sound
      if (jumpSound.isLoaded() && !jumpSound.isPlaying()) {
        jumpSound.play();
      }
    }
  }

  if (key === 'w' || key === 'W') {
    isMoving['w'] = true;
  } else if (key === 'a' || key === 'A') {
    isMoving['a'] = true;
  } else if (key === 's' || key === 'S') {
    isMoving['s'] = true;
  } else if (key === 'd' || key === 'D') {
    isMoving['d'] = true;
  }
}

function keyReleased() {
  if (key === 'w' || key === 'W') {
    isMoving['w'] = false;
  } else if (key === 'a' || key === 'A') {
    isMoving['a'] = false;
  } else if (key === 's' || key === 'S') {
    isMoving['s'] = false;
  } else if (key === 'd' || key === 'D') {
    isMoving['d'] = false;
  }
}

class Man {
  constructor() {
    this.width = 30;
    this.height = 50;
    this.headSize = 20;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.ySpeed = 0;
    this.moveSpeed = 5;
  }

  jump() {
    this.ySpeed = -jumpForce;
    isJumping = true;
  }

  move() {
    if (isMoving['w']) {
      this.y -= this.moveSpeed;
    }
    if (isMoving['a']) {
      this.x -= this.moveSpeed;
    }
    if (isMoving['s']) {
      this.y += this.moveSpeed;
    }
    if (isMoving['d']) {
      this.x += this.moveSpeed;
    }
  }

  update() {
    this.ySpeed += gravity;
    this.y += this.ySpeed;

    if (this.y > 0) {
      this.y = 0;
      isJumping = false;
    }

    this.move();
  }

  show() {
    fill(255, 0, 0);
    translate(this.x, this.y, this.z);
    box(this.width, this.height, this.width);
    translate(0, -this.height / 2 - this.headSize / 2, 0);
    sphere(this.headSize);
  }
}
