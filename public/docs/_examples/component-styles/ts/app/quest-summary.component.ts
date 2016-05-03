/* tslint:disable:no-unused-variable */
// #docplaster
import {Component, ViewEncapsulation} from '@angular/core';

// #docregion

@Component({
  moduleId: module.id,
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
