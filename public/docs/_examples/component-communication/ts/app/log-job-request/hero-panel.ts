import {Component, Input, SimpleChange} from 'angular2/core';
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
// #docregion class
export class HeroPanel {
  @Input() hero: Hero;
  _request: string;
    
  @Input() set request(newJob: string) {
    console.log(`New job request: ${newJob} (${new Date().toLocaleTimeString()})`);
    if (newJob && newJob.indexOf('$') >= 0) {
      this.request = `*** ${newJob.replace('$', '')}`; 
    } else {
      this._request = newJob;
    }
  }

  get request(): string {
    return this._request;
  }
    
  ngOnChanges(changes: {[propKey:string]: SimpleChange}){
    for (let propName in changes) {
      let changedProp = changes[propName];
      let fromValue = JSON.stringify(changedProp.previousValue);
      let toValue = JSON.stringify(changedProp.currentValue);
      console.log(`${propName} changed from ${fromValue} to ${toValue}`);
    }
  }
}
// #enddocregion class
// #enddocregion component