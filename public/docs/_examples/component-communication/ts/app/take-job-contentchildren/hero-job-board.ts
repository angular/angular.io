import {Component, ContentChildren, QueryList} from 'angular2/core';
import {HeroPanelManager} from './hero-panel-manager';
import {HeroPanel} from './hero-panel';
import {Hero} from '../hero';

@Component({
  selector: 'hero-job-board',
  templateUrl: 'app/take-job-contentchildren/job-board-template.html',
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel, HeroPanelManager]
})
export class HeroJobBoard {
  uninvitedHeroes = Hero.heroes.splice(0);
  invitedHeroes: Hero[] = [];
  respondingHeroes: Hero[] = [];
  request: string = null;
  newRequest: string = null;

  inviteHero() {
    if (this.uninvitedHeroes.length > 0) {
      let nextHero = this.uninvitedHeroes.shift();
      this.invitedHeroes.push(nextHero);
    }
  }
  
  uninviteHero(hero: Hero) {
    let toRemove = this.invitedHeroes.findIndex(h => h == hero);
    if (toRemove >= 0) {
      this.invitedHeroes.splice(toRemove, 1);
      this.uninvitedHeroes.push(hero);
    }
    toRemove = this.respondingHeroes.findIndex(h => h == hero);
    if (toRemove >= 0) {
        this.respondingHeroes.splice(toRemove, 1);
    }
  }

  announceJob() {
    this.request = this.newRequest;
  }
  
  heroTakesJob(hero: Hero){
    this.respondingHeroes.push(hero);
  }
  
  get jobStatus() {
    if (!this.request) { return "No job request announced" }
    return this.respondingHeroes.length > 0
      ? "Responding heroes"
      : "No responding heroes";
  }
}
