import {Component, Input} from 'angular2/core';
import {Hero} from '../hero';
import {JobService} from './job-service';

@Component({
  selector: 'hero-panel',
  template: `
    <div class='hero-panel'>
      <h3>{{hero.name}}</h3>
      <h4 class=job-request
        [class.announced]="request"
        [class.undertaken]="undertaken">
        {{request || 'No job announced'}}
      </h4>
    <h3 *ngIf="winner"
      [class.won] ="undertaken && winner==hero"
      [class.lost]="undertaken && winner!=hero"
      [class.else]="!undertaken">
      {{finalState}}
    </h3>
      <button
        [disabled]="!request || undertaken"
        [hidden]="winner"
        (click)="takeJob()">
          I'll take it!
      </button>
    </div>
  `,
  styleUrls: ['app/hero-panel.css']
})
// #docregion component
export class HeroPanel {
    @Input() hero: Hero;
    request: string = null;
    undertaken: boolean;
    
    constructor(private jobService: JobService) {
      jobService.jobAnnounced.subscribe(
        (job: string) =>
          this.request = job
      )
      jobService.jobAssigned.subscribe(
        (hero: Hero) =>
          this.winner = hero
      )
    }
    
    get winner() {
      return this.jobService.winner;
    }
    
    takeJob() {
      this.jobService.takeJob(this.hero);
      this.undertaken = true;
    }
    
    get finalState() {
      return this.winner == this.hero ?
        "I won the job !!!" :
        (this.undertaken ? "I lost the job :-(" : "Job taken.");
  }
}
// #enddocregion component
