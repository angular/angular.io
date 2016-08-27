/* tslint:disable: member-ordering forin */
// #docplaster
// #docregion
import { Component, OnInit }                  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Hero } from '../shared/hero';

@Component({
  moduleId:  module.id,
  selector: 'hero-form-reactive',
  templateUrl: 'hero-form-reactive.component.html'
})
// #docregion class
export class HeroFormReactiveComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  model = new Hero(18, 'Dr. WhatIsHisWayTooLongName', this.powers[0], 'Dr. What');

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.model = this.heroForm.value;
  }
// #enddocregion class

  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  // #docregion new-hero
  active = true;

// #docregion class
  newHero() {
    this.model = new Hero(42, '', '');
    this.buildForm();
    this.onValueChanged('');
// #enddocregion class

    this.active = false;
    setTimeout(() => this.active = true, 0);
// #docregion class
  }

  //// New with Reactive Form

  heroForm: FormGroup;
  constructor(private builder: FormBuilder) { }

  ngOnInit(): void { this.buildForm();  }

  formError = {
    'name': '',
    'power': ''
  };

  validationMessages = {
    'name': {
      'required':  'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.'
    },
    'power': {
      'required': 'Power is required.'
    }
  };

  buildForm(): void {
    this.heroForm = this.builder.group({
      'name': [this.model.name, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24)
        ]
      ],
      'alterEgo': [this.model.alterEgo],
      'power':    [this.model.power, Validators.required]
    });
    this.heroForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data: any) {
    const controls = this.heroForm ? this.heroForm.controls : {};
    for (const field in this.formError) {
      // clear previous error message (if any)
      this.formError[field] = '';
      const control = controls[field];
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  isRequired(controlName: string): boolean {
    const msgs = this.validationMessages[controlName];
    return msgs && msgs['required'];
  }
}
// #enddocregion class
// #enddocregion
