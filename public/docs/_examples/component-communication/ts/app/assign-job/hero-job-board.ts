import {Component} from 'angular2/core';
import {HeroPanel} from './hero-panel';
import {Hero} from '../hero';
import {JobService} from './job-service';

// #docregion annotation
@Component({
  selector: 'hero-job-board',
  templateUrl: 'app/assign-job/job-board-template.html',
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel],
  providers: [JobService]
})
// #docregion component
export class HeroJobBoard {
  newRequest: string = null;
  constructor(private jobService: JobService) {
  }
  // ...
// #enddocregion annotation

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
