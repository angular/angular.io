// #docregion
@Component({
  selector: 'hero-job-board',
  template: `...`,
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel],
  providers: [JobService] // MessageBus is omitted deliberately!
})
export class HeroJobBoard {
  // ...
  constructor(
    private jobService: JobService,
    private messageBus: MessageBus) {
  }
  // ...
}
// #enddocregion