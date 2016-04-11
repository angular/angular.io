// #docregion
export const heroDetail = {
  bindings: {
    hero: '=',
    deleted: '&'
  },
  template: `
    <h2>{{$ctrl.hero.name}} details!</h2>
    <div><label>id: </label>{{$ctrl.hero.id}}</div>
    <button ng-click="$ctrl.onDelete()">Delete</button>
  `,
  controller: function() {
    this.onDelete = () => {
      this.deleted(this.hero);
    };
  }
};
