import { Component, OnInit } from '@angular/core';
import { A11yHelperService } from '../services/a11y-helper.service';
import { CORE_DIRECTIVES } from '@angular/common';
import { A11yErrorDemoComponent } from './a11y-error-demo.component';
import { A11yCustomButtonComponent } from '../shared/a11y-custom-button.component';
import { A11yValueHelperComponent } from '../shared/a11y-value-helper.component';

@Component({
  selector: 'a11y-managing-focus',
  templateUrl: './app/managing-focus/a11y-managing-focus.component.html',
  directives: [
    CORE_DIRECTIVES,
    A11yCustomButtonComponent,
    A11yValueHelperComponent,
    A11yErrorDemoComponent
  ]
})
export class A11yManagingFocusComponent implements OnInit {

  countriesWorkedIn: Array<string>;
  buttonClicks: number = 0;

  constructor(private _a11yHelper: A11yHelperService) {
  }

  onClick(): void {
    this.buttonClicks++;
  }

  generateButtonString(): string {
    return `Button has been clicked ${this.buttonClicks} times`;
  }

  ngOnInit(): void {
    this.countriesWorkedIn = this._a11yHelper.getCountriesWorkedIn();
  }

}
