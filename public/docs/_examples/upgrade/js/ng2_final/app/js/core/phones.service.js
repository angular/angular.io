// #docregion full
(function(app) {
  'use strict';

  // #docregion service
  app.Phones = function Phones(http) {
    this.query = function() {
      return http.get('phones/phones.json')
        .map(function(res) { return res.json(); });
    };
    this.get = function(id) {
      return http.get('phones/' + id + '.json')
        .map(function(res) { return res.json(); });
    };
  }
  app.Phones.annotations = [new ng.core.InjectableMetadata()];
  app.Phones.parameters = [ng.http.Http];
  // #enddocregion service

})(window.app || (window.app = {}));
// #enddocregion full
