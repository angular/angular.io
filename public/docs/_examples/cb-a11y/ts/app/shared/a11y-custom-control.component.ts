import { Component, OnInit, Provider, forwardRef } from '@angular/core';
import { A11yHelperService } from '../services/a11y-helper.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// #docregion
const noop = () => {
};

const A11Y_CUSTOM_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => A11yCustomControlComponent),
    multi: true
  });

@Component({
  selector: 'a11y-custom-control',
  templateUrl: './app/shared/a11y-custom-control.component.html',
  styleUrls: ['./app/shared/a11y-custom-control.component.css'],
  providers: [A11Y_CUSTOM_CONTROL_VALUE_ACCESSOR]
})
export class A11yCustomControlComponent implements OnInit, ControlValueAccessor {

  uniqueId: string;

  private innerValue: any = '';
  outerValue: string = '';

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(private _a11yHelper: A11yHelperService) {
  }

  onChange(event: any, value: string) {
    if (event.keyCode === 13) {
      event.preventDefault();
    } else {
      this.innerValue = this._a11yHelper.removeHtmlStringBreaks(value);
      this.onChangeCallback(this.innerValue);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.outerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngOnInit(): void {
    this.uniqueId = this._a11yHelper.generateUniqueIdString();
  }

}
// #enddocregion
