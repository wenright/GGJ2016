Game = {

  create: function() {
    this.player = new Player();
  },

  step: function(dt) {
    this.player.update(dt);
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
    layer.translate(0, app.center.y);

    /* Draw the player */
    this.player.draw();

    /* restore drawing pointer to its previous state */
    layer.restore();
  },

  pointermove: function(event) {

  },

  pointerdown: function(event) {
    Game.pointerStartX = event.x;
    Game.pointerStartY = event.y;
  },

  pointerup: function(event) {
    var diffX = Game.pointerStartX - event.x;
    var diffY = Game.pointerStartY - event.y;
    var dist = Math.sqrt(diffX*diffX + diffY*diffY);

    Game.player.addForce(diffX/dist, diffY/dist);
  }

};
