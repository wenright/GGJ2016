var Player = function () {
  this.radius = 50;

  this.x = Game.app.center.x;
  this.y = Game.app.center.y / 2;

  this.vx = 0;
  this.vy = 0;

  this.gravity = 450;
  this.force = 1000;
  this.bonusForce = 2000;
  this.colorIndex = -1;

  this.stuck = true;

  this.lineStart = { x: 0, y: 0 };
  this.lineEnd = { x: 0, y: 0 };
  this.drawPointer = false;

  this.defaultColor = '#fff';
  this.color = this.defaultColor;
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

      this.color = this.defaultColor;
      this.colorIndex = -1;
    }
    else if (this.x > Game.app.width - this.radius - Game.margin) {
      this.x = Game.app.width - this.radius - Game.margin;
      this.vx = -this.vx;

      other = Game.rightSideBlocks.get(function(e) {
        return e.y + e.h >= thisY && e.y <= thisY;
      });

      this.color = this.defaultColor;
      this.colorIndex = -1;
    }

    // If there is a block hit, stick to it and gain its powers
    if (other) {
      this.vx = 0;
      this.vy = 0;

      if (!this.stuck) {
        // Tween the color only once
        Game.app.tween(this)
          .to({color: other.color}, 0.25, "outQuad");

        // Give player a new power
        this.colorIndex = other.colorIndex;
      }

      this.stuck = true;
    }

    // Fall through bottom of the frame then lose
    else if (this.y > Game.cameraY + Game.app.center.y + this.radius) {
      console.log('You lost!');

      app.setState(Menu);
    }
  }
};

Player.prototype.render = function () {
  // Draw the line representing where the ball will launch to
  if (this.drawPointer) {
    Game.app.layer
      .strokeStyle(this.color)
      .lineWidth(4)
      .strokeLine(this.lineStart, this.lineEnd);
  }

  Game.app.layer
    .fillStyle(this.color)
    .fillCircle(this.x, this.y, this.radius);
};

Player.prototype.pointerdown = function (event) {
  if (this.stuck) {
    this.pointerStartX = event.x;
    this.pointerStartY = event.y;

    this.lineStart = {x: this.x, y: this.y};
    this.lineEnd = {x: this.x + (this.pointerStartX - event.x), y: this.y + (this.pointerStartY - event.y)};

    this.drawPointer = true;
  }
};

Player.prototype.pointerup = function (event) {
  if (this.stuck) {
    var diffX = this.pointerStartX - event.x;
    var diffY = this.pointerStartY - event.y;
    var dist = Math.sqrt(diffX*diffX + diffY*diffY);

    if (dist > 0) {
      if (this.colorIndex === 1) {
        this.addForce(diffX/dist * this.bonusForce, diffY/dist * this.bonusForce);
      }
      else {
        this.addForce(diffX/dist * this.force, diffY/dist * this.force);
      }
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
  this.vx += dx;
  this.vy += dy;

  this.stuck = false;
};
