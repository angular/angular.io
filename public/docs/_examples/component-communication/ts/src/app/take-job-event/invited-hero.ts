import {Component, Input, Output, EventEmitter} from 'angular2/angular2';
import {Hero} from '../hero';

@Component({
  selector: 'invited-hero',
  template: `
    <div class='invited-hero'>
      <h3 class='hero-name'>Job Request for {{hero.name}}</h3> 
      <h4 class=job-request
        [class.announced]='request'
        [class.undertaken]='request && undertaken'>
        {{getRequest()}}
      </h4>
      <button (click)='undertakeJob()'
        [disabled]='!request || undertaken'>
        I'll take it!
      </button>
    </div>
  `,
  styleUrls: ['app/invited-hero.css']
})
export class InvitedHero {
  @Input() hero: Hero;
  @Input() request: string;
  @Output() onHeroResponse = new EventEmitter<Hero>();
  undertaken: boolean;
    
  getRequest() {
    return this.request
      ? this.request : "No job announced";
  }
    
  undertakeJob() {
    this.onHeroResponse.next(this.hero);
    this.undertaken = true;
  }
}