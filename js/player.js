var Player = function () {
  this.radius = 50;

  this.x = Game.app.center.x;
  this.y = Game.app.center.y / 2;

  this.vx = 0;
  this.vy = 0;

  this.gravity = 450;
  this.force = 1000;

  this.stuck = true;
};

Player.prototype.step = function (dt) {
  if (!this.stuck) {
    // Update position based on velocity and delta time
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Apply gravity by adding it to the y velocity
    this.vy += this.gravity * dt;

    // Perform collision detection, and bounce if there is a collision
    if (this.x < this.radius + Game.margin) {
      this.x = this.radius + Game.margin;
      this.vx = -this.vx;

      var other = Game.blocks.get(function(e) {
        // TODO
        return e.y + e.h >= this.x && e.y <= this.x;
      });
      console.log(other);
    }
    else if (this.x > Game.app.width - this.radius - Game.margin) {
      this.x = Game.app.width - this.radius - Game.margin;
      this.vx = -this.vx;
    }
  }
};

Player.prototype.render = function () {
  Game.app.layer
    .fillStyle('#ff7700')
    .fillCircle(this.x, this.y, this.radius);
};

Player.prototype.addForce = function (dx, dy) {
  this.vx += dx * this.force;
  this.vy += dy * this.force;

  this.stuck = false;
};
