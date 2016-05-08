// #docregion
// Import the native Angular services.
import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/common';
import { Directive } from '@angular/core';
import { forwardRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/common';
import { provide } from '@angular/core';
import { SimpleChange } from '@angular/core';

// #docregion valueaccesor
// Import our custom Angular classes.
import { ToggleComponent } from './toggle.component';

// #docregion provider
@Directive({
  selector: 'cb-toggle[ngControl],cb-toggle[ngFormControl],cb-toggle[ngModel]',
  providers: [
    provide(
      NG_VALUE_ACCESSOR,
      {
        useExisting: forwardRef( () => ToggleNgModelDirective ),
        multi: true
      }
    )
  ],
  host: {
    '(valueChange)': 'handleValueChange( $event )'
  }
})
export class ToggleNgModelDirective implements ControlValueAccessor {
// #enddocregion provider

  // Private properties.
  private changeCount: number;
  private changeDetectorRef: ChangeDetectorRef;
  private onChange: any;
  private onTouched: any;
  private toggle: ToggleComponent;

  public constructor( toggle: ToggleComponent, changeDetectorRef: ChangeDetectorRef ) {
    this.changeCount = 0;
    this.changeDetectorRef = changeDetectorRef;
    this.onChange = noop;
    this.onTouched = noop;
    this.toggle = toggle;
  }

  public handleValueChange( newValue: boolean ) : void {
    // When implementing ngModel, we are purposefully circumventing one-way data flow.
    // As such, when the target component emits a change event, we want to turn around
    // and pipe that change right back into the target component.
    this.applyChangeToTarget( this.toggle.value, newValue );
    this.onChange( newValue );
  }

  public registerOnChange( newOnChange: any ) : void {
    this.onChange = newOnChange;
  }

  public registerOnTouched( newOnTouched: any ) : void {
    // CAUTION: For this demo, we are not worrying about "touch" events.
    this.onTouched = newOnTouched;
  }

  public writeValue( newValue: any ) : void {
    this.applyChangeToTarget( this.toggle.value, !! newValue );
  }

  // Private methods.

  // #docregion applychanges
  private applyChangeToTarget( previousValue: boolean, currentValue: boolean ) : void {
    // Pipe the value into the target and alert the change detector that inputs 
    // have been changed PROGRAMMATICALLY.
    this.toggle.value = currentValue;
    this.changeDetectorRef.markForCheck();

    // Unfortunately, when we change the target component's inputs programmatically,
    // Angular doesn't help us with the life-cycle methods. As such, we have to fill in
    // the ngOnChanges() gap as the target component may be depending on it internally.
    if ( this.toggle.ngOnChanges ) {
      var change = new SimpleChange( previousValue, currentValue );

      // Unfortunately, Angular uses a private token internally to determine if the 
      // given change is the "first" change (for the given value) in the component's
      // life-cycle. Since the target component may be relying on the isFirstChange()
      // method to work as expected, we have to patch it manually.
      if ( ! this.changeCount++ ) {
        change.isFirstChange = ( () => true );
      }

      this.toggle.ngOnChanges({ value: change });
    }
  }
  // #enddocregion applychanges

}
// #enddocregion valueaccesor

function noop() {
  // No-operation function.
}