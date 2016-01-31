var Player = function () {
  this.radius = 50;

  this.x = Game.app.width / 2;
  this.y = Game.app.height / 4;

  this.vx = 0;
  this.vy = 0;

  this.gravity = 450;
  this.force = 1000;

  this.stuck = true;
};

Player.prototype.update = function (dt) {
  if (!this.stuck) {
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
  }
};

Player.prototype.draw = function () {
  Game.app.layer
    .fillStyle('#ff7700')
    .fillCircle(this.x, this.y, this.radius);
};

Player.prototype.addForce = function (dx, dy) {
  this.vx += dx * this.force;
  this.vy += dy * this.force;

  this.stuck = false;
};
