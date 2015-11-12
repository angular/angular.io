import {Component} from 'angular2/core';
import {HeroPanel} from './hero-panel';
import {Hero} from '../hero';
import {JobService} from './job-service';

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
      <div *ngIf='!winner'>
        <div *ngFor="#hero of respondingHeroes" class="responding-hero">
          <span class="hero-name">{{hero.name}}</span>
          <button (click)='assignJob(hero)'>
            Assign
          </button>
        </div>
      </div>
      
      <div *ngIf="winner">
        The winner is
        <span class="winner">{{winner.name}}</span>
      </div>
    </div>

    <div class='hero-panel-list'>
      <hero-panel 
        *ngFor='#hero of invitedHeroes'
        [hero]='hero'>
      </hero-panel>
    </div>
    `,
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel],
  providers: [JobService]
})
// #docregion component
export class HeroJobBoard {
  newRequest: string = null;
  constructor(private jobService: JobService) {
  }

  get invitedHeroes() {
    return this.jobService.invitedHeroes;
  }

  get respondingHeroes() {
    return this.jobService.respondingHeroes;
  }

  get winner() {
    return this.jobService.winner;
  }
  
  inviteHeroes() {
    this.jobService.inviteHeroes();
    this.newRequest = null;
  }
  
  announceJob() {
    this.jobService.announceJob(this.newRequest);
  }

  get jobStatus() {
    if (!this.jobService.request) { return "No job request announced" }
    if (this.winner) { return "Job assigned"; }
    return this.respondingHeroes.length
      ? "Responding heroes"
      : "No responding heroes";
  }

  assignJob(hero: Hero) {
    this.jobService.assignJob(hero);
  }
}
// #enddocregion
