import {Component} from 'angular2/angular2';
import {InvitedHero} from './invited-hero';
import {Hero} from '../hero';
import {JobService} from './job-service'

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
      (on-hero-response)='heroTakesJob($event)'>
    </invited-hero>
  </div>
    `,
  styleUrls: ['app/hero-job-board.css'],
  directives: [InvitedHero],
  providers: [JobService]
})
export class HeroJobBoard {
  invitedHeroes: Hero[] = [];
  newRequest: string = null;

  constructor(private jobService: JobService) {
    jobService.post(null);
  }

  get jobRequest() { 
    return this.jobService.getJobRequest(); 
  }

  get respondingHeroes() {
    return this.jobService.getRespondingHeroes();
  }

  inviteHeroes() {
    this.invitedHeroes = Hero.heroes.slice(0,6);
    this.jobService.post(null); 
  }

  getJobStatus() {
    if (!this.jobRequest) {
      return "No job request announced"
    }
    else {
      return this.respondingHeroes.length > 0
        ? "Responding heroes"
        : "No responding heroes";
    }
  }
    
  announceJob() {
    this.jobService.post(this.newRequest);
  }
}