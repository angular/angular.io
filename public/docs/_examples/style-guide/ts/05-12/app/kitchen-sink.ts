// #docregion
/**
 * AVOID THIS PATTERN
 */

@Component({
  selector: 'toh-button',
  template: `...`,
  inputs: [
    'label'
  ],
  outputs: [
    'change'
  ]
})
export class ButtonComponent {
  change = new EventEmitter<any>();
  label: string;
}
