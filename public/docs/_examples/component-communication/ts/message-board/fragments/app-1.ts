// #docregion
import {bootstrap, Component} from 'angular2/angular2';
import {HeroJobBoard} from './hero-job-board';
import {MessageBoard} from './message-board';

@Component({
  selector: 'hero-job-app',
  template: `
      <h1>Hero Job Application</h1>
      <message-board></message-board>
      <hero-job-board></hero-job-board>
  `,
  styles: [`
      hero-job-board {
          border: 2px dashed lightgray;
          display: block;
      }
  `],
  directives: [HeroJobBoard, MessageBoard]
})
class HeroJobApp { }

bootstrap(HeroJobApp);
// #enddocregion