import {Component, Input} from 'angular2/core';
import {Hero} from '../hero';

// #docregion component
@Component({
  selector: 'hero-panel',
  template: `
    <div class='hero-panel'>
      <h3>{{hero.name}}</h3>
      <h4 class=job-request
        [class.announced]="request">
        {{request || 'No job announced'}}
      </h4>
    </div>
  `,
  styleUrls: ['app/hero-panel.css']
})
export class HeroPanel {
    @Input() hero: Hero;
    @Input() request: string;
}
// #enddocregion component