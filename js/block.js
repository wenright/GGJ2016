var Block = function (x, y, color) {
  this.x = x;
  this.y = y;

  this.w = 100;
  this.h = 20;

  this.color = color;
};

Block.prototype.render = function () {
  Game.app.layer
    .fillStyle(this.color)
    .fillCircle(this.x, this.y, this.radius);
};

Block.prototype.step = function (dt) {
  
};
