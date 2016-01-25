// #docregion
(function(app) {
  'use strict';

  app.CheckmarkPipe = function CheckmarkPipe() {
  }
  app.CheckmarkPipe.annotations = [
    new ng.core.PipeMetadata({name: 'checkmark'})
  ];
  app.CheckmarkPipe.prototype.transform = function(input) {
    return input ? '\u2713' : '\u2718';
  };

})(window.app || (window.app = {}));
