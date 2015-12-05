// #docregion import
import {Component, Input, Output, EventEmitter} from 'angular2/core';
// #enddocregion import
import {Hero} from '../hero';

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
  @Input() request: string;
  @Output() onJobTaken = new EventEmitter<Hero>();
  undertaken: boolean;

  takeJob() {
    this.onJobTaken.next(this.hero);
    this.undertaken = true;
  }
}
// #enddocregion component
