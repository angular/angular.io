import {Component, OnInit} from "angular2/core";
import {A11yCustomButton} from "./a11y-custom-button.component";
import {A11yHelper} from "../services/a11y-helper.service";
import {CORE_DIRECTIVES} from "angular2/common";

@Component({
  selector: 'a11y-managing-focus',
  templateUrl: './app/managing-focus/a11y-managing-focus.component.html',
  directives: [CORE_DIRECTIVES, A11yCustomButton]
})
export class A11yManagingFocus implements OnInit{
  
  countriesWorkedIn: Array<string>;

  constructor(private _a11yHelper:A11yHelper) {
  }

  generateSkiplink(hash:string) {
    return this._a11yHelper.getInternalLink(hash, 'ManagingFocus');
  }

  activate():void {
    console.log('click');
  }
  
  ngOnInit():void{
    this.countriesWorkedIn = this._a11yHelper.getCountriesWorkedIn()
  }
}
