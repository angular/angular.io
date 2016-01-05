import {Component, ContentChildren, QueryList} from 'angular2/core';
import {HeroPanelManager} from './hero-panel-manager';
import {HeroPanel} from './hero-panel';

import {Hero} from '../hero';

@Component({
  selector: 'hero-job-board',
  templateUrl: 'app/invite-contentchildren/job-board-template.html',
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel, HeroPanelManager]
})
export class HeroJobBoard {
  uninvitedHeroes = Hero.heroes.splice(0);
  invitedHeroes: Hero[] = [];
  request: string = null;
  newRequest: string = null;

  inviteHero() {
    if (this.uninvitedHeroes.length > 0) {
      let nextHero = this.uninvitedHeroes.shift();
      this.invitedHeroes.push(nextHero);
    }
  }
  
  uninviteHero(hero: Hero) {
    let toRemove = this.invitedHeroes.findIndex(hr => hr == hero);
    if (toRemove >= 0) {
      this.invitedHeroes.splice(toRemove, 1);
      this.uninvitedHeroes.push(hero);
    }
  }
  announceJob() {
    this.request = this.newRequest;
  }
}
