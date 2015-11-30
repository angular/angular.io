import {Component} from 'angular2/angular2';
import {Hero} from '../hero';
import {JobService} from './job-service';
import {HeroCrm} from './hero-crm';
import {HeroPanelManager} from './hero-panel-manager';

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
      
      <h3>{{jobStatus}}</h3>
      <div *ng-if='!winner'>
        <div *ng-for="#hero of respondingHeroes" class="responding-hero">
          <span class="hero-name">{{hero.name}}</span>
          <button (click)='assignJob(hero)'>
            Assign
          </button>
        </div>
      </div>
      
      <div *ng-if="winner">
        The winner is
        <span class="winner">{{winner.name}}</span>
      </div>
    </div>

    <hero-panel-manager>
      <hero-crm *ng-for='#hero of invitedHeroes'
        [id]='hero.id' 
        [name]='hero.name'
        [distinguished]='hero.id % 2 == 0'>
      </hero-crm>
    </hero-panel-manager>
    </div>
    `,
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanelManager, HeroCrm],
  providers: [JobService]
})
export class HeroJobBoard {
  newRequest: string = null;
  winner: Hero = null;
  constructor(private jobService: JobService) {
    
  }

  get invitedHeroes() {
    return this.jobService.invitedHeroes;
  }

  get respondingHeroes() {
    return this.jobService.respondingHeroes;
  }

  inviteHeroes() {
    this.jobService.inviteHeroes();
    this.newRequest = null;
    this.winner = null;
  }
  
  announceJob() {
    this.jobService.announceJob(this.newRequest);
  }

  get jobStatus() {
    if (!this.jobService.request) { return "No job request announced" }
    if (this.winner) { return "Job assigned"; }
    return this.jobService.respondingHeroes.length
      ? "Responding heroes"
      : "No responding heroes";
  }

  assignJob(hero: Hero) {
    this.winner = hero;
    this.jobService.assignJob(hero);
  }
}