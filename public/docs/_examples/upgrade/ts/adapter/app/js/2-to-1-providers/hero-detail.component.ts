// #docregion
export const heroDetailComponent = {
  template: `
    <h2>{{heroDetail.hero.id}}: {{heroDetail.hero.name}}</h2>
  `,
  controller: ['heroes', function(heroes) {
    this.hero = heroes.get()[0];
  }]
};
