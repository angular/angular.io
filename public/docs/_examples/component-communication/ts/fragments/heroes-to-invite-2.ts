// #docregion
import {Component, ContentChildren, QueryList} from 'angular2/core';
import {HeroPanel} from './hero-panel';
import {Hero} from '../hero';
import {HeroCrm} from './hero-crm'

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
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel]
})
export class HeroJobBoard {
  @ContentChildren(HeroCrm) heroesToInvite: QueryList<HeroCrm>;
  
  invitedHeroes: Hero[] = [];
  respondingHeroes: Hero[] = [];
  
  inviteHeroes() {
    this.invitedHeroes = this.heroesToInvite.toArray();
    // ...
  }
  
  heroTakesJob(hero: Hero){
    this.respondingHeroes.push(hero);
  }
  // ...
}
// #enddocregion