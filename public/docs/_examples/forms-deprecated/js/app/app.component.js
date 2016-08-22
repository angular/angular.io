// #docregion
(function(app) {
  app.AppComponent = ng.core
    .Component({
      selector: 'my-app',
      template: '<hero-form></hero-form>',
      directives: [app.HeroFormComponent]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
