// #docregion
import {
  Component, Input, ViewChild,
  OnChanges, SimpleChange
} from 'angular2/core';


class Hero {
  constructor(public name:string){}
}

@Component({
  selector: 'on-changes',
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
export class OnChangesComponent implements OnChanges {
// #docregion inputs
  @Input() hero: Hero;
  @Input() power: string;
// #enddocregion inputs

  changeLog:string[] = [];

  // #docregion ng-on-changes
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    for (let propName in changes) {
      let prop = changes[propName];
      let cur  = JSON.stringify(prop.currentValue)
      let prev = JSON.stringify(prop.previousValue);
      this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }
  // #enddocregion ng-on-changes

  reset() { this.changeLog.length = 0; }
}

/***************************************/

@Component({
  selector: 'on-changes-parent',
  templateUrl:'app/on-changes-parent.component.html',
  styles: ['.parent {background: Lavender;}'],
  directives: [OnChangesComponent]
})
export class OnChangesParentComponent {
  hero:Hero;
  power:string;
  title = 'OnChanges';
  @ViewChild(OnChangesComponent) childView:OnChangesComponent;

  constructor() {
    this.reset();
  }

  reset(){
    // new Hero object every time; triggers onChanges
    this.hero = new Hero('Windstorm');
    // setting power only triggers onChanges if this value is different
    this.power = 'sing';
    this.childView && this.childView.reset();
  }
}
