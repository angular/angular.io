import {bootstrap, Component} from 'angular2/angular2';
import {HeroJobBoard} from './hero-job-board';

@Component({
  selector: 'hero-job-app',
  template: `
      <h1>Hero Job Application</h1>
      <hero-job-board></hero-job-board>
  `,
  styles: [`
      hero-job-board {
          border: 2px dashed lightgray;
          display: block;
      }
  `],
  directives: [HeroJobBoard]
})
class HeroJobApp { }

bootstrap(HeroJobApp);
