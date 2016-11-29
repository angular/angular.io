/* tslint:disable:component-class-suffix */
// #docplaster
// #docregion
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'hero-signup-1',
  templateUrl: './hero-signup-1.component.html'
})
// #docregion v1
export class HeroSignUpComponent1 {
  form = new FormGroup ({
    name: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    confirm: new FormControl()
  });
}
// #enddocregion v1

@Component({
  moduleId: module.id,
  selector: 'hero-signup-2',
  templateUrl: './hero-signup-2.component.html'
})
// #docregion v2
export class HeroSignUpComponent2 {
  form: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      name: '',
      username: '',
      password: '',
      confirm: ''
    });
  }
}
// #enddocregion v2

@Component({
  moduleId: module.id,
  selector: 'hero-signup-3',
  templateUrl: './hero-signup-3.component.html'
})
// #enddocregion v3
export class HeroSignUpComponent3 {
  form: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      name: '',
      username: '',
      password: '',
      confirm: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    });
  }
}
// #enddocregion v3

@Component({
  moduleId: module.id,
  selector: 'hero-signup-4',
  templateUrl: './hero-signup-4.component.html'
})
// #enddocregion v4
export class HeroSignUpComponent4 {
  form: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      name: '',
      username: '',
      password: '',
      confirm: '',
      address: this._fb.group({
        street: '',
        city: '',
        state: '',
        zip: ''
      })
    });
  }
}
// #enddocregion v4

@Component({
  moduleId: module.id,
  selector: 'hero-signup-5',
  templateUrl: './hero-signup-5.component.html'
})
// #docregion v5
export class HeroSignUpComponent5 {
  form: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      name: '',
      username: '',
      password: '',
      confirm: '',
      address: this._fb.group({
        street: '',
            city: '',
            state: '',
            zip: ''
      })
    });

    this.form.patchValue({
      name: 'Nancy'
    });
  }
}
// #enddocregion v5

@Component({
  moduleId: module.id,
  selector: 'hero-signup-6',
  templateUrl: './hero-signup-6.component.html'
})
// #docregion v6
export class HeroSignUpComponent6 {
  form: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      name: '',
      username: '',
      password: '',
      confirm: '',
      address: this._fb.group({
        street: '',
            city: '',
            state: '',
            zip: ''
      })
    });

    this.form.setValue({
      name: 'Nancy',
      username: 'NancyD',
      password: '',
      confirm: '',
      address: {
        street: '123 Fake Street',
        city: 'San Francisco',
        state: 'CA',
        zip: '12345'
      }
    });
  }
}
// #enddocregion v6

export const components = [
  HeroSignUpComponent1,
  HeroSignUpComponent2,
  HeroSignUpComponent3,
  HeroSignUpComponent4,
  HeroSignUpComponent5,
  HeroSignUpComponent6,
];
