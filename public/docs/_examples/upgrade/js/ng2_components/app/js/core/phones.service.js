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

  app.upgradeAdapter.addProvider(app.Phones);
  angular.module('phonecat.core')
    .factory('phones', app.upgradeAdapter.downgradeNg2Provider(app.Phones));

})(window.app || (window.app = {}));
// #enddocregion full
