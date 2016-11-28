// #docplaster
// #docregion
// #docregion reactive-comp
// #docregion reactive-comp-imports
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormGroup,
         FormBuilder, Validators } from '@angular/forms';
// #enddocregion reactive-comp-imports

function passwordMatcher(c: AbstractControl) {
  return c.get('password').value === c.get('confirm').value
    ? null : {'nomatch': true};
}
// #docregion reactive-comp-metadata
@Component({
  moduleId: module.id,
  selector: 'reactive-form',
  templateUrl: './hero-signup.component.html'
})
// #enddocregion reactive-comp-metadata
// #docregion form-array-class
export class HeroSignUpComponent {

  form: FormGroup;
  addresses: FormArray;
// #enddocregion form-array-class
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      name: '',
      account: this._fb.group({
        username: '',
        password: '',
        confirm: ''
      }, {validator:passwordMatcher}),
      addresses: this.buildArray()
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
// #docregion add-group
  add() {
    this.addresses.push(this.buildGroup());
  }
}
// #enddocregion add-group
// #enddocregion reactive-comp
// #docregion
// #docregion form-array-class-constructor
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      ...
      addresses: this.buildArray()
    });
   }

// #enddocregion form-array-class-constructor
