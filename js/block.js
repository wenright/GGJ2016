var Block = function (x, y, color) {
  this.x = x;
  this.y = y;

  this.w = 100;
  this.h = 20;
};

Block.prototype.draw = function () {
  Game.app.layer
    .fillStyle('#ff7700')
    .fillCircle(this.x, this.y, this.radius);
};
