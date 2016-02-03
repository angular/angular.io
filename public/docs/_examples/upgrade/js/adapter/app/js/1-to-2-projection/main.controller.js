(function(app) {
  'use strict';

  function MainController() {
    this.hero = new app.Hero(1, 'Windstorm', 'A descr');
  }

  angular.module('heroApp')
    .controller('MainController', MainController)

})(window.app || (window.app = {}));
