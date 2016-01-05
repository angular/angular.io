// #docregion
export const heroDetail = {
  bindings: {
    hero: '=',
    deleted: '&'
  },
  template: `
    <h2>{{heroDetail.hero.name}} details!</h2>
    <div><label>id: </label>{{heroDetail.hero.id}}</div>
    <button ng-click="heroDetail.onDelete()">Delete</button>
  `,
  controller: function() {
    this.onDelete = () => {
      this.deleted({hero: this.hero});
    };
  }
};
