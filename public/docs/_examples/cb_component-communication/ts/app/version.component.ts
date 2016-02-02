// #docregion
import {Component, Input, SimpleChange} from 'angular2/core';

@Component({
  selector: 'version',
  template: `
    <h2>Version {{major}}.{{minor}}</h2>
    <h3>Change log:</h3>
    <ul>
      <li *ngFor="#change of changeLog">{{change}}</li>
    </ul>
  `
})
export class VersionComponent {
  @Input() major: number;
  @Input() minor: number;
  changeLog: string[] = [];
  
  ngOnChanges(changes: {[propKey:string]: SimpleChange}){
    let log = ''; 
    for (let propName in changes) {
      let changedProp = changes[propName]; 
      let fromValue = JSON.stringify(changedProp.previousValue); 
      let toValue = JSON.stringify(changedProp.currentValue);
      if (log.length > 0) log += ', ';
      log += `${propName} changed from ${fromValue} to ${toValue}`;
    }
    this.changeLog.push(log); 
  }
}
// #enddocregion