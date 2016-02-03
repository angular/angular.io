(function(app) {
  'use strict';

  function MainController() {
    this.hero = new app.Hero(1, 'Windstorm');
    this.heroes = [
      new app.Hero(2, 'Superman'),
      new app.Hero(3, 'Spiderman')
    ]
  }
  MainController.prototype.onDelete = function(hero) {
    console.log('del', hero);
  };

  angular.module('heroApp')
    .controller('MainController', MainController);

})(window.app || (window.app = {}));
