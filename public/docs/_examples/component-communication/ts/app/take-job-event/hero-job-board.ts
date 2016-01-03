import {Component} from 'angular2/core';
import {HeroPanel} from './hero-panel';

import {Hero} from '../hero';

@Component({
  selector: 'hero-job-board',
  templateUrl: 'app/take-job-event/job-board-template.html',
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel]
})
export class HeroJobBoard {
  heroes = Hero.heroes;
  invitedHeroes: Hero[] = [];
  request: string = null;
  newRequest: string = null;
  respondingHeroes: Hero[] = [];

  inviteHeroes() {
    this.invitedHeroes = Hero.heroes;
    this.respondingHeroes = [];
    this.request = null;
    this.newRequest = null;
  }
  
// #docregion announce
  announceJob() {
    this.request = this.newRequest;
  }
// #enddocregion announce
  
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
