// #docplaster
// #docregion appexport
(function(app) {

  // #docregion component
  var HeroComponent = ng.core.Component({
      selector: 'hero-view-2',
      template:
        '<h1>Name: {{getName()}}</h1>',
    })
    .Class({
      constructor: function() {
      },
      getName: function() {
        return 'Windstorm';
      }
    });
  // #enddocregion component

  app.HeroComponentDsl = HeroComponent;

})(window.app = window.app || {});
// #enddocregion appexport
