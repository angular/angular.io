(function(app) {

// #docregion
app.HeroHostComponent = HeroHostComponent;

HeroHostComponent.annotations = [
  new ng.core.Component({
    selector: 'hero-host',
    template:
      '<h1 [class.active]="active">Hero Host</h1>' +
      '<div>Heading clicks: {{clicks}}</div>',
    host: {
      // HostBindings to the <hero-host> element
      '[title]': 'title',
      '[class.heading]': 'headingClass',
      '(click)': 'clicked()',

      // HostListeners on the entire <hero-host> element
      '(mouseenter)': 'enter($event)',
      '(mouseleave)': 'leave($event)'
    },
    // Styles within (but excluding) the <hero-host> element
    styles: ['.active {background-color: yellow;}']
  })
];

function HeroHostComponent() {
  this.clicks = 0;
  this.headingClass = true;
  this.title = 'Hero Host Tooltip content';
}

HeroHostComponent.prototype.clicked = function() {
  this.clicks += 1;
}

HeroHostComponent.prototype.enter = function(event) {
  this.active = true;
  this.headingClass = false;
}

HeroHostComponent.prototype.leave = function(event) {
  this.active = false;
  this.headingClass = true;
}
// #enddocregion

})(window.app = window.app || {});

//// DSL Version ////

(function(app) {

// #docregion dsl
app.HeroHostDslComponent = ng.core.Component({
  selector: 'hero-host-dsl',
  template: `
    <h1 [class.active]="active">Hero Host (DSL)</h1>
    <div>Heading clicks: {{clicks}}</div>
  `,
  host: {
    // HostBindings to the <hero-host-dsl> element
    '[title]': 'title',
    '[class.heading]': 'headingClass',
    '(click)': 'clicked()',

    // HostListeners on the entire <hero-host-dsl> element
    '(mouseenter)': 'enter($event)',
    '(mouseleave)': 'leave($event)'
  },
  // Styles within (but excluding) the <hero-host-dsl> element
  styles: ['.active {background-color: coral;}']
})
.Class({
  constructor: function HeroHostDslComponent() {
    this.clicks = 0;
    this.headingClass = true;
    this.title = 'Hero Host Tooltip DSL content';
  },

  clicked() {
    this.clicks += 1;
  },

  enter(event) {
    this.active = true;
    this.headingClass = false;
  },

  leave(event) {
    this.active = false;
    this.headingClass = true;
  }
});
// #enddocregion dsl

})(window.app = window.app || {});
