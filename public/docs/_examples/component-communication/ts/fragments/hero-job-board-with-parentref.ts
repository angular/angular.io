// #docregion
@Component({
  selector: 'hero-job-board',
  template: `
    <div class='job-board'>
      <h2>Hero Job Board</h2>
      ...
      <div *ng-for="#hero of respondingHeroes" class="responding-hero">
        <span class="hero-name">{{hero.name}}</span>
        <button>Assign</button>
      </div>
      ...
    <div class='hero-panel-list'>
      <hero-panel *ng-for='#hero of invitedHeroes'
        [hero]='hero'
        [request]=request
        [parent]='jobBoard'>
      </hero-panel>
    </div>
    `
})
export class HeroJobBoard {
  // ...
  respondingHeroes: Hero[] = [];

  heroTakesJob(hero: Hero){
    this.respondingHeroes.push(hero);
  }
  
  get jobBoard() {
    return this;
  }
}
// #enddocregion