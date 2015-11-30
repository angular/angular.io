import {Component, Input} from 'angular2/angular2';
import {Hero} from '../hero';

@Component({
  selector: 'invited-hero',
  template: `
    <div class='invited-hero'>
      <h3 class='hero-name'>Job Request for {{hero.name}}</h3> 
      <h4 class=job-request
        [class.announced]='request'>
        {{getRequest()}}
      </h4>
      <button>I'll take it!</button>
    </div>
  `,
  styleUrls: ['app/invited-hero.css']
})
export class InvitedHero {
  @Input() hero: Hero;
  @Input() request: string;
    
  getRequest() {
    return this.request
      ? this.request : "No job announced";
  }
}