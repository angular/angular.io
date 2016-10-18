(function(app) {

  // #docregion
  var TitleComponent = ng.core.Component({
    selector: 'hero-title',
    template:
      '<h1>{{titlePrefix}} {{title}}</h1>' +
      '<button (click)="ok()">OK</button>' +
      '<ng-content></ng-content>'
  }).Class({
    constructor: [
      [
        new ng.core.Optional(),
        new ng.core.Inject('titlePrefix')
      ],
      new ng.core.Attribute('title'),
      [
        new ng.core.Query('okMsg'),
        ng.core.ElementRef
      ],
      function(titlePrefix, title, msg) {
        this.titlePrefix = titlePrefix;
        this.title  = title;
        this.msg = msg;
      }
    ],
    ok: function() {
      var msgEl =
        this.msg.first.nativeElement;
      msgEl.textContent = 'OK!';
    }
  });
  // #enddocregion

  var AppComponent = ng.core.Component({
    selector: 'hero-di-inject-additional',
    template: '<hero-title title="Tour of Heroes">' +
      '<span #okMsg class="ok-msg"></span>' +
    '</hero-title>',
    directives: [TitleComponent]
  }).Class({
    constructor: function() { }
  });

  app.HeroDIInjectAdditionalComponent = AppComponent;

})(window.app = window.app || {});
