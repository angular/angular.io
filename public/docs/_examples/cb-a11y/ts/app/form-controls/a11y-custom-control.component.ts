import {Component, OnInit, Provider, forwardRef,} from "angular2/core";
import {A11yHelper} from "../services/a11y-helper.service";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "angular2/common";

// #docregion
const noop = () => {
};

const A11Y_CUSTOM_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => A11yCustomControl),
    multi: true
  });

@Component({
  selector: 'a11y-custom-control',
  templateUrl: './app/form-controls/a11y-custom-control.component.html',
  styleUrls: ['./app/form-controls/a11y-custom-control.component.css'],
  providers: [A11Y_CUSTOM_CONTROL_VALUE_ACCESSOR]
})
export class A11yCustomControl implements OnInit, ControlValueAccessor {

  uniqueId:string;

  private _innerValue:any = '';
  outerValue:string = '';

  private _onTouchedCallback:() => void = noop;
  private _onChangeCallback:(_:any) => void = noop;

  constructor(private _a11yHelper:A11yHelper) {
  }

  onChange(event:any, value:string) {
    if (event.keyCode == 13) {
      event.preventDefault();
    }
    else {
      this._innerValue = this._a11yHelper.removeHtmlStringBreaks(value);
      this._onChangeCallback(this._innerValue);
    }
  }

  onBlur(){
    this._onTouchedCallback();
  }

  writeValue(value:any) {
    if (value != this._innerValue) {
      this._innerValue = value;
      this.outerValue = value;
    }
  }

  registerOnChange(fn:any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn:any) {
    this._onTouchedCallback = fn;
  }

  ngOnInit():void {
    this.uniqueId = this._a11yHelper.generateUniqueIdString();
  }

}
// #enddocregion
