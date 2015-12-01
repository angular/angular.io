// #docregion
@Component({
  selector: 'hero-job-board',
  template: `
    <!-- ... -->
    <input [(ng-model)]="newRequest" (keyup.enter)="announceJob()"
      placeholder="Enter a job request">
    <button (click)="announceJob()">Ask</button>
      
    <!-- ... -->
    <div class='hero-panel-list'>
      <hero-panel *ng-for='#hero of invitedHeroes'
        [hero]='hero'
        [request]=request>
      </hero-panel>
    </div>
    `,
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel]
})
export class HeroJobBoard {
  invitedHeroes: Hero[] = [];
  request: string = null;
  newRequest: string = null;
  // ...
  announceJob() {
    this.request = this.newRequest;
  }
}
// #enddocregion