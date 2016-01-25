// #docregion
(function() {
  'use strict';

  // #docregion definecomponent
  var heroDetail = {
    template: '<h2>Windstorm details!</h2><div><label>id: </label>1</div>',
    controller: function() {
    }
  };
  // #enddocregion definecomponent
  
  angular.module('heroApp')
    .component('heroDetail', heroDetail);

})();
