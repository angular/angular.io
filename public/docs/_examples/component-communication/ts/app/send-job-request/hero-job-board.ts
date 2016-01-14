// #docregion
import {Component} from 'angular2/core';
import {HeroPanel} from './hero-panel';

import {Hero} from '../hero';

@Component({
  selector: 'hero-job-board',
  templateUrl: 'app/send-job-request/job-board-template.html',
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel]
})
export class HeroJobBoard {
  invitedHeroes: Hero[] = [];
  request: string = null;
  newRequest: string = null;

  inviteHeroes() {
    this.invitedHeroes = Hero.heroes;
    this.request = null;
    this.newRequest = null;
  }
  
  announceJob() {
    this.request = this.newRequest;
  }
}
// #enddocregion
