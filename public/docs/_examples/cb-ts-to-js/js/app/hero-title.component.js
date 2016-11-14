(function(app) {

// #docregion
app.HeroTitleComponent = HeroTitleComponent;

// #docregion templateUrl
HeroTitleComponent.annotations = [
  new ng.core.Component({
    selector: 'hero-title',
    templateUrl: 'app/hero-title.component.html'
  })
];
// #enddocregion templateUrl

function HeroTitleComponent(titlePrefix, title) {
    this.titlePrefix = titlePrefix;
    this.title  = title;
    this.msg = '';
}

HeroTitleComponent.prototype.ok = function() {
  this.msg = 'OK!';
}

HeroTitleComponent.parameters = [
  [new ng.core.Optional(), new ng.core.Inject('titlePrefix')],
  [new ng.core.Attribute('title')]
];

// #enddocregion

})(window.app = window.app || {});

////////// DSL version ////////////

(function(app) {

// #docregion dsl
app.HeroTitleDslComponent = ng.core.Component({
  selector: 'hero-title-dsl',
  templateUrl: 'app/hero-title.component.html'
})
.Class({
  constructor: [
    [ new ng.core.Optional(), new ng.core.Inject('titlePrefix') ],
    new ng.core.Attribute('title'),
    function HeroTitleDslComponent(titlePrefix, title) {
      this.titlePrefix = titlePrefix;
      this.title  = title;
      this.msg = '';
    }
  ],

  ok: function() {
    this.msg = 'OK!';
  }
});
// #enddocregion dsl

})(window.app = window.app || {});
