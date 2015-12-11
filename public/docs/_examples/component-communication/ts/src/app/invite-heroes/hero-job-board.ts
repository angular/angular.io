// #docregion
import {Component} from 'angular2/core';
import {HeroPanel} from './hero-panel';

import {Hero} from '../hero';

@Component({
  selector: 'hero-job-board',
  template: `
    <div class='job-board'>
      <h2>Hero Job Board</h2>
      <div>
        <button (click)='inviteHeroes()'>Invite heroes</button>
      </div>
    </div>
    
    <div class='hero-panel-list'>
      <hero-panel *ngFor='#hero of invitedHeroes'
        [hero]='hero'>
      </hero-panel>
    </div>
    `,
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel]
})
export class HeroJobBoard {
  invitedHeroes: Hero[] = [];

  inviteHeroes() {
    this.invitedHeroes = Hero.heroes;
  }
}
// #enddocregion