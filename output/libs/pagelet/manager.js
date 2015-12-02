var Manager, Q, _;

_ = require('lodash');

Q = require('q');

Manager = (function() {
  function Manager(root) {
    this.queue = [];
    this.count = 0;
    this.root = root;
    this.pipeArray = [];
    this.res = root['pagelet'].getResponse();
  }

  Manager.prototype._levelTraversal = function(root, callback) {
    var c, children, pagelet, _i, _len;
    this.count++;
    pagelet = root['pagelet'];
    children = root['children'];
    this.pipeArray.push(pagelet);
    if (children) {
      children = [].concat(root['children']);
      callback.call(null, pagelet, _.pluck(children, 'pagelet'));
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        c = children[_i];
        this.queue.push(c);
      }
    }
    while (this.queue.length > 0) {
      root = this.queue.shift();
      this._levelTraversal(root, callback);
    }
  };

  Manager.prototype.pipe = function() {
    var rootPagelet;
    rootPagelet = this.root['pagelet'];
    if (!rootPagelet) {
      throw new Error('pagelet manager must have a root pagelet');
      return;
    }
    this._levelTraversal(this.root, function(parent, children) {
      var p, _i, _len;
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        p = children[_i];
        parent.appendChildWithID(p.__pipeID__);
        p.__parentID__ = parent.__pipeID__;
      }
    });
    rootPagelet._setSiblingsCount(this.count);
    rootPagelet._doStartPipe();
    return Q.all(_.map(this.pipeArray, function(p, index) {
      return p.pipe();
    })).done(function() {
      return rootPagelet.end();
    });
  };

  return Manager;

})();

module.exports = Manager;
