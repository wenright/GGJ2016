Game = {

  create: function() {
    // Defines size of black bars and blocks on the side
    this.margin = 40;
    this.lost = false;
    this.cameraY = app.center.y;

    this.player = new Player();

    this.leftSideBlocks = new EntitySystem();
    this.leftSideBlocks.add(new Block(0, 0, '#25f000'));
  },

  step: function(dt) {
    this.player.step(dt);
    this.leftSideBlocks.step(dt);
  },

  render: function() {
    /* get reference to the application */
    var app = this.app;

    /* get reference to drawing surface */
    var layer = this.app.layer;

    if (!this.lost) {
      /* clear screen */
      layer.clear("#222");

      /* Draw a black bar down both sides of the screen */
      layer.fillStyle('#000')
        .fillRect(0, 0, this.margin, app.height);

      layer.fillStyle('#000')
        .fillRect(app.width - this.margin, 0, 40, app.height);

      /* save all setting of drawing pointer */
      layer.save();

      this.cameraY = Math.min(this.player.y, this.cameraY);

      /* translate drawing pointer to the center of screen */
      layer.translate(0, -this.cameraY + app.height /2);

      /* Draw the player */
      this.player.render();

      /* Draw all of the leftSideBlocks */
      this.leftSideBlocks.render();

      /* restore drawing pointer to its previous state */
      layer.restore();

      /* Draw things that aren't affected by camera movement here (GUI) */
    }
  },

  pointermove: function(event) {
    Game.player.pointermove(event);
  },

  pointerdown: function(event) {
    Game.player.pointerdown(event);
  },

  pointerup: function(event) {
    Game.player.pointerup(event);
  }

};
