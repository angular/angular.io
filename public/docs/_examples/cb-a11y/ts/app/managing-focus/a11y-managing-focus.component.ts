import {Component, OnInit} from "angular2/core";
import {A11yCustomButton} from "./a11y-custom-button.component";
import {A11yHelper} from "../services/a11y-helper.service";
import {CORE_DIRECTIVES} from "angular2/common";
import {A11yValueHelper} from "../a11y-value-helper.component";
import {A11yErrorDemo} from "./a11y-error-demo.component";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
  selector: 'a11y-managing-focus',
  templateUrl: './app/managing-focus/a11y-managing-focus.component.html',
  directives: [
    CORE_DIRECTIVES,
    ROUTER_DIRECTIVES,
    A11yCustomButton,
    A11yValueHelper,
    A11yErrorDemo
  ]
})
export class A11yManagingFocus implements OnInit{

  countriesWorkedIn: Array<string>;
  buttonClicks: number = 0;

  constructor(private _a11yHelper:A11yHelper) {
  }

  generateSkiplink(hash:string) {
    return this._a11yHelper.getInternalLink(hash, 'ManagingFocus');
  }

  onClick():void {
    this.buttonClicks++;
  }

  generateButtonString(): string{
    return `Button has been clicked ${this.buttonClicks} times`;
  }

  ngOnInit():void{
    this.countriesWorkedIn = this._a11yHelper.getCountriesWorkedIn()
  }

}
