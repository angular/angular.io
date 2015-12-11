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
      
      <h3>Job Request</h3>
      <input [(ng-model)]="newRequest" (keyup.enter)="announceJob()"
        placeholder="Enter a job request">
      <button (click)="announceJob()">Ask</button>
      
      <h3>Responding heroes</h3>
      <div *ng-for="#hero of respondingHeroes" class="responding-hero">
        <span class="hero-name">{{hero.name}}</span>
        <button>Assign</button>
      </div>
    </div>

    <div class='hero-panel-list'>
      <hero-panel *ng-for='#hero of invitedHeroes'
        [hero]='hero'
        [request]=request>
      </hero-panel>
    </div>
    `,
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