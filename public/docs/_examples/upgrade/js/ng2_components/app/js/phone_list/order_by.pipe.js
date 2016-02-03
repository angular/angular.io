// #docregion
(function(app) {
  'use strict';

  app.OrderByPipe = function OrderByPipe() {
  };
  app.OrderByPipe.annotations = [
    new ng.core.PipeMetadata({name: 'orderBy'})
  ];
  app.OrderByPipe.prototype.transform = function(input, args) {
    if (input) {
      var property = args[0];
      return input.slice().sort(function(a, b) {
        if (a[property] < b[property]) {
          return -1;
        } else if (b[property] < a[property]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      return input;
    }
  };

})(window.app || (window.app = {}));
