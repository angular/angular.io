// #docplaster
// #docregion
// #docregion reactive-comp-v1
// #docregion reactive-comp-imports-v1
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup} from '@angular/forms';
// #enddocregion reactive-comp-imports-v1

// #docregion reactive-comp-imports-addon
import { AbstractControl, FormControl, FormGroup, FormBuilder} from '@angular/forms';
// #enddocregion reactive-comp-imports-addon

// #docregion reactive-comp-metadata-v1
@Component({
  moduleId: module.id,
  selector: 'reactive-form',
  templateUrl: './hero-signup.component.1.html'
})
// #enddocregion reactive-comp-metadata-v1

// #docregion reactive-comp-class-v1
export class ReactiveFormComponent {
	form = new FormGroup ({
		name: new FormControl(),
		username: new FormControl(),
		password: new FormControl(),
		confirm: new FormControl()
	});
}
// #enddocregion reactive-comp-class-v1
// #enddocregion reactive-comp-v1

// #docregion class-refactor
export class ReactiveFormComponent {
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

// #enddocregion class-refactor

// #docregion add-form-controls
export class ReactiveFormComponent {
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

// #enddocregion add-form-controls

// #docregion add-group
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
// #enddocregion add-group
// #docregion

// #docregion patch-value
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
  // #enddocregion patch-value

  //#docregion set-value
    this.form.setValue({
      name: 'Nancy',
      username: 'NancyD',
      password: '',
      confirm: '',
      address: {
      	street: '123 Fake Street',
      	city: 'San Francisco',
      	state: 'CA',
      	zip:'12345'
    });
// #enddocregion set-value

