var EntitySystem = function () {
  this.pool = [];
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
  },

  // Returns the object that returns true in the given function
  get: function (func) {
    for (var entity in this.pool) {
      if (func(this.pool[entity])) {
        return this.pool[entity];
      }
    }
  }

};
