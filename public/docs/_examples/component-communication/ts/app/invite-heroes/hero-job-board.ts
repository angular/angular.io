// #docregion
import {Component} from 'angular2/core';
import {HeroPanel} from './hero-panel';

import {Hero} from '../hero';

@Component({
  selector: 'hero-job-board',
  templateUrl: 'app/invite-heroes/job-board-template.html',
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
