// #docregion
/* avoid */

// #docregion example
@Component({
  selector: 'toh-hero',
  template: `...`
})
export class HeroComponent {
  @Output() onSavedTheDay = new EventEmitter<boolean>();
}
// #enddocregion example
