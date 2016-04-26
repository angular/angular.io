// #docregion
/**
 * AVOID THIS PATTERN
 */

@Component({
  selector: 'toh-button',
  template: `...`
})
export class ButtonComponent {
  @Output('changeEvent') change = new EventEmitter<any>();
  @Input('labelAttribute') label: string;
}