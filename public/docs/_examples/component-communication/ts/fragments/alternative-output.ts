// #docregion
@Component({
  inputs: ['hero', 'request'],
  outputs: ['onJobTaken']
})
export class HeroPanel {
  hero: Hero;
  request: string;
  onJobTaken = new EventEmitter<Hero>();
}
// #enddocregion