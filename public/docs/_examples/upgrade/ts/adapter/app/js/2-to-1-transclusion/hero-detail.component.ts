// #docregion
export const heroDetailComponent = {
  bindings: {
    hero: '='
  },
  template: `
    <h2>{{hero.name}}</h2>
    <div>
      <ng-transclude></ng-transclude>
    </div>
  `
};
