/* tslint:disable: member-ordering */
// #docplaster
// #docregion
import { Component } from '@angular/core';


import { Hero }      from '../shared/hero';

@Component({
  moduleId:  module.id,
  selector: 'hero-form-template',
  templateUrl: 'hero-form-template.component.html'
})
// #docregion class
export class HeroFormTemplateComponent {

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  model = new Hero(18, 'Dr. WhatIsHisWayTooLongName', this.powers[0], 'Dr. What');

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
// #enddocregion class

  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;
// #docregion class

  newHero() {
    this.model = new Hero(42, '', '');
// #enddocregion class

    this.active = false;
    setTimeout(() => this.active = true, 0);
// #docregion class
  }
}
// #enddocregion class
// #enddocregion
