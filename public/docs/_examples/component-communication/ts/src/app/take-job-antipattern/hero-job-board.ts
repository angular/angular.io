import {Component} from 'angular2/angular2';
import {InvitedHero} from './invited-hero';
import {Hero} from '../hero';

@Component({
  selector: 'hero-job-board',
  template: `
  <div class='request-panel'>
    <h2>Hero Job Board</h2>
    <button (click)='inviteHeroes()'>Invite heroes</button>

    <!-- Request panel -->
    <h3>Job Request</h3>
    <label>Request:</label>
    <input [(ng-model)]="newRequest" (keyup.enter)="announceJob()"
      placeholder="Enter a job request">
    <button (click)="announceJob()">Ask</button>

    <!-- Response panel -->
    <h3>{{getJobStatus()}}</h3>
    <div class='responding-hero'
      *ng-for='#hero of respondingHeroes'>
      <span class='hero-name'>{{hero.name}}</span>
      <button>Assign</button>
    </div>
  </div>

  <div class='invited-hero-list'>
    <!-- Invited hero panel -->
    <invited-hero *ng-for='#hero of invitedHeroes'
      [hero]='hero' [request]='jobRequest'
      [job-board]='getJobBoard()'>
    </invited-hero>
  </div>
    `,
  styleUrls: ['app/hero-job-board.css'],
  directives: [InvitedHero]
})
export class HeroJobBoard {
  invitedHeroes: Hero[] = [];
  respondingHeroes: Hero[];
  jobRequest: string = null;
  newRequest: string = null;

  inviteHeroes() {
    this.invitedHeroes = Hero.heroes.slice(0,6);
    this.respondingHeroes = [];
    this.jobRequest = null;
  }
  
  getJobStatus() {
    if (!this.newRequest) {
      return "No job request announced"
    }
    else {
      return this.respondingHeroes.length > 0
        ? "Responding heroes"
        : "No responding heroes";
    }
  }

  announceJob() {
    this.jobRequest = this.newRequest;
  }
  
  getJobBoard() {
    return this;
  }
    
  heroTakesJob(hero: Hero) {
    this.respondingHeroes.push(hero);
  }
}
