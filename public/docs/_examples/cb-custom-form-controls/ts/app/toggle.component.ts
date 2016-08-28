// #docregion
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

// #docregion component
@Component({
  selector: 'cb-toggle',
  host: {
    '[class.for-on]': 'value',
    '[class.for-off]': '! value',
    '(click)': 'handleClick($event)'
  },
  template: `
    <div class='switch'>
      <span class='thumb'></span>
    </div>
    <span class='label'>{{ ( value ? 'On' : 'Off' ) }}</span>
  `
})
export class ToggleComponent implements OnChanges {
  @Input() public value = false;
  @Output() public valueChange = new EventEmitter<boolean>;

  handleClick(event: any): void {
    this.valueChange.next( ! this.value );
  }

  ngOnChanges(changes: any): void {
    console.log(
      'Toggle changed from %s to %s during %s change.',
      changes.value.previousValue,
      changes.value.currentValue,
      (changes.value.isFirstChange() ? 'first' : 'subsequent')
    );
  }

}
// #enddocregion component
