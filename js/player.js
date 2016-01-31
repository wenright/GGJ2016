var Player = function () {
  this.radius = 50;

  this.x = 0;
  this.y = 0;

  this.vx = 1000;
  this.vy = -100;

  this.gravity = 450;
};

Player.prototype.update = function (dt) {
  // Update position based on velocity and delta time
  this.x += this.vx * dt;
  this.y += this.vy * dt;

  // Apply gravity by adding it to the y velocity
  this.vy += this.gravity * dt;

  // Perform collision detection, and bounce if there is a collision
  if (this.x < this.radius) {
    this.x = this.radius;
    this.vx = -this.vx;
  }
  else if (this.x > Game.app.width - this.radius) {
    this.x = Game.app.width - this.radius;
    this.vx = -this.vx;
  }
};

Player.prototype.draw = function () {
  Game.app.layer
    .fillStyle('#ff7700')
    .fillCircle(this.x, this.y, this.radius);
};
