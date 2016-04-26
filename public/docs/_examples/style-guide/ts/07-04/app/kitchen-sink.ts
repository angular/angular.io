// #docregion
/**
 * AVOID THIS PATTERN
 */

export class HeroArena {
  constructor(
      @Inject(HeroFactory) private heroFactory: HeroFactory,
      @Inject(Http) private http: Http) {}
}
