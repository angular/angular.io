(function(app) {

  // #docregion definecomponent
  function HeroDetailComponent() {
  }

  HeroDetailComponent.annotations = [
    new ng.core.ComponentMetadata({
      selector: 'hero-detail',
      template: '<h2>Windstorm details!</h2><div><label>id: </label>1</div>'
    })
  ];
  // #enddocregion definecomponent

  // #docregion downgradecomponent
  angular.module('heroApp')
    .directive('heroDetail', app.upgradeAdapter.downgradeNg2Component(HeroDetailComponent));
  // #enddocregion downgradecomponent

})(window.app || (window.app = {}));
