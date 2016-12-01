/* tslint:disable:component-class-suffix */
// #docplaster
// #docregion

import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'hero-signup-1',
  templateUrl: './hero-signup-1.component.html'
})

// #docregion v1
export class HeroSignUpComponent1 {
  heroForm = new FormGroup ({
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
  heroForm: FormGroup; // <--- heroForm is of type FormGroup
  constructor(private _fb: FormBuilder) { // <--- inject FormBuilder
    this.heroForm = this._fb.group({ // <--- make this.form a FormBuilder group
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
// #docregion v3
export class HeroSignUpComponent3 {
  heroForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.heroForm = this._fb.group({
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
// #docregion v4
export class HeroSignUpComponent4 {
  heroForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.heroForm = this._fb.group({
      name: '',
      username: '',
      password: '',
      confirm: '',
      address: this._fb.group({ // <-- Here's your nested FormGroup
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
  templateUrl: './hero-signup-4.component.html'
})
// #docregion v5
export class HeroSignUpComponent5 {
  heroForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.heroForm = this._fb.group({
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
    this.heroForm.patchValue({
      name: 'Nancy'
    });
  }
}
// #enddocregion v5

@Component({
  moduleId: module.id,
  selector: 'hero-signup-6',
  templateUrl: './hero-signup-4.component.html'
})
// #docregion v6
export class HeroSignUpComponent6 {
  heroForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.heroForm = this._fb.group({
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
    // #docregion set-value
    this.heroForm.setValue({
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
    // #enddocregion set-value
  }
}
// #enddocregion v6

@Component({
  moduleId: module.id,
  selector: 'hero-signup-7',
  templateUrl: './hero-signup-5.component.html'
})
// #docregion v7
export class HeroSignUpComponent7 {
  // #docregion addresses
  heroForm: FormGroup;
  addresses: FormArray; // <--add this under form
  // #enddocregion addresses

  constructor(private _fb: FormBuilder) {
    this.heroForm = this._fb.group({
      name: '',
      username: '',
      password: '',
      confirm: '',
      // #docregion addresses-refactor
      addresses: this.buildArray()
      // #enddocregion addresses-refactor
    });
  }
  // #docregion build-array
  buildArray(): FormArray {
    this.addresses = this._fb.array([
      this.buildGroup()
    ]);
    return this.addresses;
  }
  // #enddocregion build-array
  // #docregion build-group
  buildGroup(): FormGroup {
    return this._fb.group({
      street: '',
      city: '',
      state: '',
      zip: ''
    });
  }
  // #enddocregion build-group
  // #docregion add
  add() {
    this.addresses.push(this.buildGroup());
  }
  // #enddocregion add
}
// #enddocregion v7


export const components = [
  HeroSignUpComponent1,
  HeroSignUpComponent2,
  HeroSignUpComponent3,
  HeroSignUpComponent4,
  HeroSignUpComponent5,
  HeroSignUpComponent6,
  HeroSignUpComponent7
];
