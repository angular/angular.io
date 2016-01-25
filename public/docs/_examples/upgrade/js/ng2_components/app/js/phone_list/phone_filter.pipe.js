// #docregion
(function(app) {
  'use strict';

  app.PhoneFilterPipe = function PhoneFilterPipe() {
  }
  app.PhoneFilterPipe.annotations = [
    new ng.core.PipeMetadata({name: 'phoneFilter'})
  ];
  app.PhoneFilterPipe.prototype.transform = function(input, args) {
    var query = args[0];
    if (query) {
      query = query.toLowerCase();
      return input.filter(function(phone) {
        var name = phone.name.toLowerCase();
        var snippet = phone.snippet.toLowerCase();
        return name.indexOf(query) >= 0 || snippet.indexOf(query) >= 0;
      });
    } else {
      return input;
    }
  };

})(window.app || (window.app = {}));
