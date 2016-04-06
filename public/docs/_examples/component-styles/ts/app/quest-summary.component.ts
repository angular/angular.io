// #docplaster
import {Component, ViewEncapsulation} from 'angular2/core';

// #docregion
// Let TypeScript know about the special SystemJS __moduleName variable
declare var __moduleName: string;
// #enddocregion
// moduleName is not set in some module loaders; set it explicitly
if (!__moduleName) {
  __moduleName = `http://${location.host}/${location.pathname}/app/`;
}
console.log(`The __moduleName is ${__moduleName} `);
// #docregion

@Component({
  moduleId: __moduleName,
  selector: 'quest-summary',
  // #docregion urls
  templateUrl: 'quest-summary.component.html',
  styleUrls:  ['quest-summary.component.css']
  // #enddocregion urls  
// #enddocregion
/*
  // #docregion encapsulation.native
  // warning: few browsers support shadow DOM encapsulation at this time
  encapsulation: ViewEncapsulation.Native 
  // #enddocregion encapsulation.native
*/
// #docregion
})
export class QuestSummaryComponent { }
// #enddocregion
