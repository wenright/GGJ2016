var app = new PLAYGROUND.Application({

  smoothing: false,

  create: function() {

  },

  ready: function() {
    /* after preloading route events to the game state */
    this.setState(Menu);
  }

});
