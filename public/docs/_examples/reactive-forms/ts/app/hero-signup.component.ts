// #docregion reactive-comp-imports
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
// #enddocregion reactive-comp-imports

// #docregion reactive-comp-metadata
@Component({
  moduleId: module.id,
  selector: 'hero-signup',
  templateUrl: './hero-signup.component.html'
})
// #enddocregion reactive-comp-metadata

export class HeroSignUpComponent {
  form: FormGroup;
  addresses: FormArray;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      name: '',
      username: '',
      password: '',
      confirm: '',
      addresses: this.buildArray()
    });
  }

  buildArray(): FormArray {
    this.addresses = this._fb.array([
      this.buildGroup()
    ]);
    return this.addresses;
  }

  buildGroup(): FormGroup {
    return this._fb.group({
      street: '',
      city: '',
      state: '',
      zip: ''
    });
  }

  add() {
    this.addresses.push(this.buildGroup());
  }

}

