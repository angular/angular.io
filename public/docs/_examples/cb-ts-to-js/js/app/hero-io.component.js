(function(app) {
  // #docregion
  var ConfirmComponent = ng.core.Component({
    selector: 'my-confirm',
    inputs: [
      'okMsg',
      'notOkMsg: cancelMsg'
    ],
    outputs: [
      'ok',
      'notOk: cancel'
    ],
    template:
      '<button (click)="onOkClick()">' +
        '{{okMsg}}' +
      '</button>' +
      '<button (click)="onNotOkClick()">' +
        '{{notOkMsg}}' +
      '</button>'
  }).Class({
    constructor: function() {
      this.ok = new ng.core.EventEmitter();
      this.notOk = new ng.core.EventEmitter();
    },
    onOkClick: function() {
      this.ok.next(true);
    },
    onNotOkClick: function() {
      this.notOk.next(true);
    }
  });
  // #enddocregion

  function AppComponent() {
  }
  AppComponent.annotations = [
    new ng.core.Component({
      selector: 'hero-io',
      template: '<my-confirm [okMsg]="\'OK\'"' +
        '[cancelMsg]="\'Cancel\'"' +
        '(ok)="onOk()"' +
        '(cancel)="onCancel()">' +
        '</my-confirm>' +
        '<span *ngIf="okClicked">OK clicked</span>' +
        '<span *ngIf="cancelClicked">Cancel clicked</span>',
      directives: [ConfirmComponent]
    })
  ];
  AppComponent.prototype.onOk = function() {
    this.okClicked = true;
  }
  AppComponent.prototype.onCancel = function() {
    this.cancelClicked = true;
  }
  app.HeroIOComponent = AppComponent;

})(window.app = window.app || {});
