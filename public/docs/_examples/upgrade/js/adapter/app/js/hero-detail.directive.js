// #docregion
(function() {

  angular.module('heroApp')
    .directive('heroDetail', heroDetail);

  function heroDetail() {
    return {
      scope: {},
      bindToController: {
        hero: '=',
        deleted: '&'
      },
      templateUrl: 'app/js/hero-detail.directive.html',
      controller: function() {
        this.onDelete = function() {
          this.deleted({hero: this.hero});
        };
      },
      controllerAs: 'ctrl'
    }
  }
  
})();
