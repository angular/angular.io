// #docplaster
// #docregion example
/**
 * AVOID THIS PATTERN
 */
// #enddocregion example

@Component({
  selector: 'toh-hero',
  template: `...`
})
// #docregion example
export class HeroComponent {
  @Output() onSavedTheDay = new EventEmitter<boolean>();
}
// #enddocregion example