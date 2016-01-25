// #docregion
(function(app) {

  // #docregion defineandregistercomponent
  function HeroesService() {
  }
  HeroesService.prototype.get = function() {
    return [
      new app.Hero(1, 'Windstorm'),
      new app.Hero(2, 'Spiderman')
    ];
  };

  angular.module('heroApp')
    .service('heroes', HeroesService);
  // #enddocregion defineandregistercomponent
  
})(window.app || (window.app = {}));
