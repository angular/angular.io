// #docregion
export const heroDetailComponent = {
  bindings: {
    hero: '='
  },
  template: `
    <h2>{{$ctrl.hero.name}}</h2>
    <div>
      <ng-transclude></ng-transclude>
    </div>
  `
};
