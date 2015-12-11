import {Component} from 'angular2/core';
import {HeroPanel} from './hero-panel';

import {Hero} from '../hero';

// #docregion component
@Component({
  selector: 'hero-job-board',
  template: `
    <div class='job-board'>
      <h2>Hero Job Board</h2>
      <div>
        <button (click)='inviteHeroes()'>Invite heroes</button>
      </div>
      
      <h3>Job Request</h3>
      <input [(ngModel)]="newRequest" (keyup.enter)="announceJob()"
        placeholder="Enter a job request">
      <button (click)="announceJob()">Ask</button>
      
      <h3>{{jobStatus}}</h3>
      <div *ngFor="#hero of respondingHeroes" class="responding-hero">
        <span class="hero-name">{{hero.name}}</span>
        <button>Assign</button>
      </div>
    </div>

    <div class='hero-panel-list'>
      <hero-panel *ngFor='#hero of invitedHeroes'
        [hero]='hero'
        [request]=request
        (onJobTaken)='heroTakesJob($event)'>
      </hero-panel>
    </div>
    `,
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
// #enddocregion component