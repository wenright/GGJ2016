var EntitySystem = function () {
  this.pool = [];

  console.log('Entity system loaded');
};

EntitySystem.prototype = {

  loop: function () {
    for (var entity in this.pool) {
      this.pool[entity][arguments[0]](arguments[1]);
    }
  },

  add: function (entity) {
    this.pool.push(entity);
  },

  remove: function (entity) {
    // TODO
  },

  step: function (dt) {
    this.loop('step', dt);
  },

  render: function () {
    this.loop('render');
  }

};
