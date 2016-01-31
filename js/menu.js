Menu = {

  create: function() {
    this.restartButton = new Button();
  },

  step: function(dt) {
  },

  render: function() {
    /* get reference to the application */
    var app = this.app;

    /* get reference to drawing surface */
    var layer = this.app.layer;

    /* clear screen */
    layer.clear("#222");

    /* save all setting of drawing pointer */
    layer.save();

    /* translate drawing pointer to the center of screen */
    //layer.translate(0, app.height/2);

    /* Draw button */
    this.restartButton.drawButton(layer);

    /* restore drawing pointer to its previous state */
    layer.restore();

    /* Draw things that aren't affected by camera movement here (GUI) */
  },

  pointerdown: function(event) {

  },

  pointerup: function(event) {
    if (this.restartButton.clicked(event)) {
      app.setState(newGame());
    }
  }

};

var Button = function() {
  this.width = Menu.app.width/2;
  this.height = Menu.app.height/7;
  this.x = this.width/2;
  this.y = Menu.app.height/2 - this.height/2;

  this.font = "40pt Calibri";
};

Button.prototype.drawButton = function(layer) {
  layer
    .fillStyle("#FFF")
    .roundRect(this.x, this.y, this.width, this.height, 50)
    .fill()
    .fillStyle("#000")
    .font(this.font)
    .fillText("Play", this.width-45, this.y + this.height/2);
};

Button.prototype.clicked = function(event) {
  if (event.x >= this.x && event.x <= this.x + this.width) {
    if (event.y >= this.y && event.y <= this.y + this.height){
      return true;
    }
  }

  return false;
};
