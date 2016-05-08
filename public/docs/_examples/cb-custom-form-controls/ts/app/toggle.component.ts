// #docregion
// Import the native Angular services.
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HostBinding } from '@angular/core';
import { HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Output } from '@angular/core';
import { SimpleChange } from '@angular/core';

// #docregion component
@Component({
  selector: 'cb-toggle',
  host: {
    '[class.for-on]': 'value',
    '[class.for-off]': '! value',
    '(click)': 'handleClick( $event )'
  },
  template: 
  `
    <div class='switch'>
      <span class='thumb'></span>
    </div>
    <span class='label'>{{ ( value ? 'On' : 'Off' ) }}</span>
  `
})
export class ToggleComponent implements OnChanges {

  // Public properties.
  @Input() public value: boolean;
  @Output() public valueChange: EventEmitter<boolean>;

  public constructor() {
    this.value = false;
    this.valueChange = new EventEmitter();
  }

  public handleClick( event: any ) : void {
    this.valueChange.next( ! this.value );
  }

  public ngOnChanges( changes: any ) {
    console.log( 
      'Toggle changed from %s to %s during %s change.', 
      changes.value.previousValue, 
      changes.value.currentValue,
      ( changes.value.isFirstChange() ? 'first' : 'subsequent' )
    );
  }

}
// #enddocregion component