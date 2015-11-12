// #docregion
export class HeroJobBoard {
  constructor(
    private jobService: JobService,
    private messageBus: MessageBus) {
  }
  // ...
}

// ...

export class HeroPanel {
  constructor(
    private jobService: JobService,
    private messageBus: MessageBus) {
      // ...
  }
    // ...
}
// #enddocregion