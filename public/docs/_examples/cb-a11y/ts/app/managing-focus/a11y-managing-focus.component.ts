import {Component} from "angular2/core";
import {A11yCustomButton} from "./a11y-custom-button.component";
import {A11yHelper} from "../services/a11y-helper.service";

@Component({
  selector: 'a11y-managing-focus',
  templateUrl: './app/managing-focus/a11y-managing-focus.component.html',
  directives: [A11yCustomButton]
})
export class A11yManagingFocus {

  constructor(private _a11yHelper:A11yHelper) {
  }

  generateSkiplink(hash:string) {
    return this._a11yHelper.getInternalLink(hash, 'ManagingFocus');
  }

  activate():void {
    console.log('click');
  }
}
