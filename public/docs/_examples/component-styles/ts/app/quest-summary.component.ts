// #docplaster
import {Component, ViewEncapsulation} from 'angular2/core';

// #docregion
// Let TypeScript know about the special SystemJS __moduleName variable
declare var __moduleName: string;
// #enddocregion
// moduleName doesn't work on Plunkr, set it explicitly
if (!__moduleName) {
  __moduleName = `http://${location.host}/${location.pathname}/app/`;
}
// #docregion

@Component({
  moduleId: __moduleName,
  selector: 'quest-summary',
  template: 'No quests ongoing',
  styleUrls: ['quest-summary.component.css'],
})
export class QuestSummaryComponent {

}
// #enddocregion
