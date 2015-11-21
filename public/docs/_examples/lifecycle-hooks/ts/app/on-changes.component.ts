// #docregion
import {
  Component, Input, Output,
  OnChanges, SimpleChange,
} from 'angular2/core';


export class Hero {
  constructor(public name:string){}
}

@Component({
  selector: 'my-hero',
  template: `
  <div class="hero">
    <p>{{hero.name}} can {{power}}</p>

    <h4>-- Change Log --</h4>
    <div *ngFor="#chg of changeLog">{{chg}}</div>
  </div>
  `,
  styles: [
    '.hero {background: LightYellow; padding: 8px; margin-top: 8px}',
    'p {background: Yellow; padding: 8px; margin-top: 8px}'
  ]
})
export class MyHeroComponent implements OnChanges {
  @Input() hero: Hero;
  @Input() power: string;
  @Input() reset: {};

  changeLog:string[] = [];

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {

    // Empty the changeLog whenever 'reset' property changes
    // hint: this is a way to respond programmatically to external value changes.
    if (changes['reset']) { this.changeLog.length = 0; }

    for (let propName in changes) {
      let prop = changes[propName];
      let cur = JSON.stringify(prop.currentValue)
      let prev = JSON.stringify(prop.previousValue); // first time is {}; after is integer
      this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }
}

/***************************************/

@Component({
  selector: 'on-changes-parent',
  template: `
   <div class="parent">
    <h2>OnChanges</h2>

    <div>Hero.name: <input [(ngModel)]="hero.name"> <i>does NOT trigger onChanges</i></div>
    <div>Power: <input [(ngModel)]="power"> <i>DOES trigger onChanges</i></div>
    <div><button (click)="reset()">Reset Log</button> <i>triggers onChanges and clears the change log</i></div>

    <my-hero [hero]="hero" [power]="power" [reset]="resetTrigger"></my-hero>
  </div>
  `,
  styles: ['.parent {background: Lavender; padding: 10px; margin:100px 8px;}'],
  directives: [MyHeroComponent]
})
export class OnChangesParentComponent {
  hero:Hero;
  power:string;
  resetTrigger = false;

  constructor() {
    this.reset();
  }

  reset(){
    // new Hero object every time; triggers onChange
    this.hero = new Hero('Windstorm');
    // setting power only triggers onChange if this value is different
    this.power = 'sing';
    // always triggers onChange ... which is interpreted as a reset
    this.resetTrigger = !this.resetTrigger;
  }
}
