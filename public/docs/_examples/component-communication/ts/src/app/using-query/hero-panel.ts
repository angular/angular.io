import {Component, Input, Output, EventEmitter, CORE_DIRECTIVES} from 'angular2/angular2';
import {HeroCrm} from './hero-crm';
import {JobService} from './job-service';

@Component({
  selector: 'hero-panel',
  template: `
    <div class='hero-panel'
      [class.distinguished]='hero.distinguished'>
      <h3>{{hero.name}}</h3>
      <h4 class=job-request
        [class.announced]="request"
        [class.undertaken]="undertaken">
        {{request || 'No job announced'}}
      </h4>
    <h3 *ng-if="winner"
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
  styleUrls: ['app/hero-panel.css'],
  directives: [CORE_DIRECTIVES]
})
export class HeroPanel {
    @Input() hero: HeroCrm;
    request: string = null;
    undertaken: boolean;
    winner: HeroCrm = null;
    
    constructor(private jobService: JobService) {
      var component = this;
      jobService.jobAnnounced.subscribe(
        (job: string) =>
          component.request = job
      )
      jobService.jobAssigned.subscribe(
        (hero: HeroCrm) =>
          component.winner = hero
      )
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
