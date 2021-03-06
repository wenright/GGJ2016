// HACK: ☃
function newGame() {
  return Game = {

    create: function() {
      // Defines size of black bars and blocks on the side
      this.margin = 40;
      this.lost = false;
      this.cameraY = app.center.y;
      this.lastBlockAddedY = 0;

      this.player = new Player();

      this.leftSideBlocks = new EntitySystem();
      this.rightSideBlocks = new EntitySystem();
    },

    step: function(dt) {
      if (!this.lost) {
        this.player.step(dt);

        this.leftSideBlocks.step(dt);
        this.rightSideBlocks.step(dt);

        // HACK: there are probably better ways of building up the level
        // TODO: Blocks are never removed.  They will exist forever and ever.
        // Add some randomm blocks in once player reaches certain heights
        if (this.player.y - app.height < this.lastBlockAddedY) {
          if (Math.random() > 0.5) {
            this.rightSideBlocks.add(new Block(app.width - this.margin, this.lastBlockAddedY));
            this.lastBlockAddedY -= 300 + Math.random() * 200;
            this.leftSideBlocks.add(new Block(0, this.lastBlockAddedY));
          }
          else {
            this.leftSideBlocks.add(new Block(0, this.lastBlockAddedY));
            this.lastBlockAddedY -= 300 + Math.random() * 200;
            this.rightSideBlocks.add(new Block(app.width - this.margin, this.lastBlockAddedY));
          }

          this.lastBlockAddedY -= 300 + Math.random() * 200;
        }
      }
    },

    render: function() {
      /* get reference to the application */
      var app = this.app;

      /* get reference to drawing surface */
      var layer = this.app.layer;

      if (!this.lost) {
        /* clear screen */
        layer.clear("#434D53");

        /* Draw a black bar down both sides of the screen */
        layer.fillStyle('#222')
          .fillRect(0, 0, this.margin, app.height);

        layer.fillStyle('#222')
          .fillRect(app.width - this.margin, 0, 40, app.height);

        /* save all setting of drawing pointer */
        layer.save();

        this.cameraY = Math.min(this.player.y, this.cameraY);

        /* translate drawing pointer to the center of screen */
        layer.translate(0, -this.cameraY + app.height /2);

        /* Draw the player */
        this.player.render();

        /* Draw all of the blocks on the left and right sides */
        this.leftSideBlocks.render();
        this.rightSideBlocks.render();

        /* restore drawing pointer to its previous state */
        layer.restore();

        /* Draw things that aren't affected by camera movement here (GUI) */

        layer
          .fillStyle("#fff")
          .font("40pt Calibri")
          .fillText(((-this.cameraY + this.app.center.y/2) | 0), this.margin, this.margin);

      }
      else {
        /* clear screen */
        layer.clear("#222");

        /* Draw game over text */
        layer
          .fillStyle("#fff")
          .textAlign("center")
          .fillText("Game Over!", app.center.x, app.center.y);
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
}
