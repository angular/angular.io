// #docregion
import {Component} from 'angular2/core';
import {HeroJobBoard} from './hero-job-board';
import {MessageBoard} from './message-board';
import {MessageBus} from './message-bus';

@Component({
  selector: 'job-board-with-messages',
  template: `
    <message-board></message-board>
    <hero-job-board></hero-job-board>
  `,
  directives: [MessageBoard, HeroJobBoard],
  providers: [MessageBus]
})
export class JobBoardWithMessages { }
// #enddocregion 