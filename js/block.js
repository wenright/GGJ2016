var Block = function (x, y, color) {
  this.x = x;
  this.y = y;

  this.w = Game.margin;
  this.h = 120;

  this.color = color;
};

Block.prototype.render = function () {
  Game.app.layer
    .fillStyle(this.color)
    .fillRect(this.x, this.y, this.w, this.h);
};

Block.prototype.step = function (dt) {

};
