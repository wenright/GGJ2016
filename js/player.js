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

      var thisY = this.y;

      var other = Game.leftSideBlocks.get(function(e) {
        return e.y + e.h >= thisY && e.y <= thisY;
      });

      if (other) {
        this.vx = 0;
        this.vy = 0;
        this.stuck = true;
      }
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

Player.prototype.pointerdown = function (event) {
  this.pointerStartX = event.x;
  this.pointerStartY = event.y;
};

Player.prototype.pointerup = function (event) {
  var diffX = this.pointerStartX - event.x;
  var diffY = this.pointerStartY - event.y;
  var dist = Math.sqrt(diffX*diffX + diffY*diffY);

  if (dist > 0) {
    this.addForce(diffX/dist, diffY/dist);
  }
};

Player.prototype.addForce = function (dx, dy) {
  this.vx += dx * this.force;
  this.vy += dy * this.force;

  this.stuck = false;
};
