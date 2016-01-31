var Player = function () {
  this.radius = 50;

  this.x = Game.app.center.x;
  this.y = Game.app.center.y / 2;

  this.vx = 0;
  this.vy = 0;

  this.gravity = 450;
  this.force = 1000;

  this.stuck = true;

  this.lineStart = { x: 0, y: 0 };
  this.lineEnd = { x: 0, y: 0 };
  this.drawPointer = false;

  this.color = '#ff7700';
};

Player.prototype.step = function (dt) {
  if (!this.stuck) {
    // Update position based on velocity and delta time
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Apply gravity by adding it to the y velocity
    this.vy += this.gravity * dt;

    var thisY = this.y;
    var other;

    // Perform collision detection, and bounce if there is a collision
    if (this.x < this.radius + Game.margin) {
      this.x = this.radius + Game.margin;
      this.vx = -this.vx;

      other = Game.leftSideBlocks.get(function(e) {
        return e.y + e.h >= thisY && e.y <= thisY;
      });
    }
    else if (this.x > Game.app.width - this.radius - Game.margin) {
      this.x = Game.app.width - this.radius - Game.margin;
      this.vx = -this.vx;

      other = Game.rightSideBlocks.get(function(e) {
        return e.y + e.h >= thisY && e.y <= thisY;
      });
    }

    // If there is a block hit, stick to it and gain its powers
    if (other) {
      this.vx = 0;
      this.vy = 0;

      // Tween the color only once
      if (!this.stuck) {
        Game.app.tween(this)
          .to({color: other.color}, 0.25, "outQuad");
      }

      this.stuck = true;
    }

    // Fall through bottom of the frame then lose
    else if (this.y > Game.cameraY + Game.app.center.y + this.radius) {
      console.log('Game over!');
      Game.lost = true;
    }
  }
};

Player.prototype.render = function () {
  Game.app.layer
    .fillStyle(this.color)
    .fillCircle(this.x, this.y, this.radius);

  // Draw the line representing where the ball will launch to
  if (this.drawPointer) {
    Game.app.layer
      .strokeStyle("#0af")
      .lineWidth(4)
      .strokeLine(this.lineStart, this.lineEnd);
  }
};

Player.prototype.pointerdown = function (event) {
  if (this.stuck) {
    this.pointerStartX = event.x;
    this.pointerStartY = event.y;

    this.lineStart = {x: this.x, y: this.y};
    this.lineEnd = { x: this.x + (this.pointerStartX - event.x), y: this.y + (this.pointerStartY - event.y)};

    this.drawPointer = true;
  }
};

Player.prototype.pointerup = function (event) {
  if (this.stuck) {
    var diffX = this.pointerStartX - event.x;
    var diffY = this.pointerStartY - event.y;
    var dist = Math.sqrt(diffX*diffX + diffY*diffY);

    if (dist > 0) {
      this.addForce(diffX/dist, diffY/dist);
    }

    this.drawPointer = false;
  }
};

Player.prototype.pointermove = function(event) {
  if (this.stuck) {
    this.lineStart = { x: this.x, y: this.y};
    this.lineEnd = { x: this.x + (this.pointerStartX - event.x), y: this.y + (this.pointerStartY - event.y)};
  }
};

Player.prototype.addForce = function (dx, dy) {
  this.vx += dx * this.force;
  this.vy += dy * this.force;

  this.stuck = false;
};
