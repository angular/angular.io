import { Component, OnInit } from '@angular/core';

import { A11yHelperService } from '../services/a11y-helper.service';

@Component({
  moduleId: module.id,
  selector: 'a11y-managing-focus',
  templateUrl: 'a11y-managing-focus.component.html'
})
export class A11yManagingFocusComponent implements OnInit {
  countriesWorkedIn: Array<string>;
  buttonClicks = 0;

  constructor(private a11yHelper: A11yHelperService) {
  }

  onClick(): void {
    this.buttonClicks++;
  }

  generateButtonString(): string {
    return `Button has been clicked ${this.buttonClicks} times`;
  }

  ngOnInit(): void {
    this.countriesWorkedIn = this.a11yHelper.getCountriesWorkedIn();
  }

}
