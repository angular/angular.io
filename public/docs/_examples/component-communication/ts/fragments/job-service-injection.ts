// #docregion
@Component({
  selector: 'hero-job-board',
  template: `...`,
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel],
  providers: [JobService]
})
export class HeroJobBoard {
  newRequest: string = null;
  constructor(private jobService: JobService) {
  }
  // ...
}
// #enddocregion