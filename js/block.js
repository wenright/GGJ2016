var blockColors = [
  '#CC0C39',
  '#C8CF02',
  '#1693A7'
];

var Block = function (x, y) {
  this.x = x;
  this.y = y;

  this.w = Game.margin;
  this.h = 200;

  this.colorIndex = (Math.random() * 3) | 0;
  this.color = blockColors[this.colorIndex];
};

Block.prototype.render = function () {
  Game.app.layer
    .fillStyle(this.color)
    .fillRect(this.x, this.y, this.w, this.h);
};

Block.prototype.step = function (dt) {

};
