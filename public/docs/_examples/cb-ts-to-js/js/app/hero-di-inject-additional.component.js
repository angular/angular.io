(function(app) {

  // #docregion
  var TitleComponent = ng.core.Component({
    selector: 'hero-title',
    template:
      '<h1>{{titlePrefix}} {{title}}</h1>' +
      '<button (click)="ok()">OK</button>' +
      '<p>{{ msg }}</p>'
  }).Class({
    constructor: [
      [
        new ng.core.Optional(),
        new ng.core.Inject('titlePrefix')
      ],
      new ng.core.Attribute('title'),
      function(titlePrefix, title) {
        this.titlePrefix = titlePrefix;
        this.title  = title;
        this.msg = '';
      }
    ],
    ok: function() {
      this.msg = 'OK!';
    }
  });
  // #enddocregion

  var AppComponent = ng.core.Component({
    selector: 'hero-di-inject-additional',
    template: '<hero-title title="Tour of Heroes">' +
    '</hero-title>'
  }).Class({
    constructor: function() { }
  });
 
  app.HeroesDIInjectAdditionalModule =
    ng.core.NgModule({
      imports: [ ng.platformBrowser.BrowserModule ],
      declarations: [
        AppComponent,
        TitleComponent
      ],
      bootstrap: [ AppComponent ]
    })
    .Class({
      constructor: function() {}
    });

})(window.app = window.app || {});
