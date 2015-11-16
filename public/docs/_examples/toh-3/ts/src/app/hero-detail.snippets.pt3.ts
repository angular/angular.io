// #docregion template
@Component({
    selector: 'my-hero-detail',
    template: `
      <div *ng-if="hero">
        <h2>{{selected.name}} details!</h2>
        <div><label>id: </label>{{hero.id}}</div>
        <div>
          <label>name: </label>
          <input [(ng-model)]="hero.name" placeholder="name"></input>
        </div>
      </div>
    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
  })
// #enddocregion template

// #docregion inputs
@Component({
    selector: 'my-hero-detail',
    template: `
      <div *ng-if="hero">
        <h2>{{hero.name}} details!</h2>
          <div><label>id: </label>{{hero.id}}</div>
            <div>
              <label>name: </label>
              <input [(ng-model)]="hero.name" placeholder="name"></input>
            </div>
          </div>
    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    inputs: ['hero']
  })
  // #enddocregion inputs