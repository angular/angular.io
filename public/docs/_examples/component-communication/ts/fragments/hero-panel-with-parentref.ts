// #docregion
// ...
import {HeroJobBoard} from './hero-job-board'
// ...
@Component({
  selector: 'hero-panel',
  template: `
    <div class='hero-panel'>
      ...
      <button
        [disabled]="!request || undertaken"
        [hidden]="winner"
        (click)="takeJob()">
          I'll take it!
      </button>
    </div>
  `,
  styleUrls: ['app/hero-panel.css']
})
export class HeroPanel {
    @Input() hero: Hero;
    @Input() request: string;
    @Input() parent: HeroJobBoard;
    undertaken: boolean;
    
    takeJob() {
      this.parent.heroTakesJob(this.hero);
      this.undertaken = true;
    }
}
// #enddocregion