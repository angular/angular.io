// #docregion
@Component({
  selector: 'hero-job-board',
  template: `
    ...
    <div class='hero-panel-list'>
      <hero-panel *ng-for='#hero of invitedHeroes'
        [hero]='hero'
        [request]=request
        (on-job-taken)='heroTakesJob($event)'>
      </hero-panel>
    </div>
    `,
  directives: [HeroPanel]
})
export class HeroJobBoard {
  invitedHeroes: Hero[] = [];

  inviteHeroes() {
    this.invitedHeroes = Hero.heroes;
  }
  // ...
}
// #enddocregion