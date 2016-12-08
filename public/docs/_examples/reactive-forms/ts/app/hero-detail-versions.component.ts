/* tslint:disable:component-class-suffix */
// #docplaster
// #docregion

import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Address, Hero, states } from './data-model';

//////// 1 ////////////////////////

@Component({
  moduleId: module.id,
  selector: 'hero-detail-1',
  templateUrl: './hero-detail-2.component.html'
})

// #docregion v1
export class HeroDetailComponent1 {
  heroForm = new FormGroup ({
    name: new FormControl()
  });
}
// #enddocregion v1

//////// 2 ////////////////////////

@Component({
  moduleId: module.id,
  selector: 'hero-detail-2',
  templateUrl: './hero-detail-2.component.html'
})
// #docregion v2
export class HeroDetailComponent2 {
  heroForm: FormGroup; // <--- heroForm is of type FormGroup
  constructor(private fb: FormBuilder) { // <--- inject FormBuilder
    this.heroForm = this.fb.group({ // <--- make this.form a FormBuilder group
      name: '',
    });
  }
}
// #enddocregion v2

//////// 3 ////////////////////////

@Component({
  moduleId: module.id,
  selector: 'hero-detail-3',
  templateUrl: './hero-detail-3.component.html'
})
// #docregion v3
export class HeroDetailComponent3 {
  states = states;

  heroForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.heroForm = this.fb.group({
      name: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    });
  }
}
// #enddocregion v3

////////// 4 /////////////////////

@Component({
  moduleId: module.id,
  selector: 'hero-detail-4',
  templateUrl: './hero-detail-4.component.html'
})
// #docregion v4
export class HeroDetailComponent4 {
  states = states;
  heroForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.heroForm = this.fb.group({
      name: '',
      address: this.fb.group({ // <-- Here's your nested FormGroup
        street: '',
        city: '',
        state: '',
        zip: ''
      })
    });
  }
}
// #enddocregion v4

////////// 5 ////////////////////

@Component({
  moduleId: module.id,
  selector: 'hero-detail-5',
  templateUrl: './hero-detail-4.component.html'
})
// #docregion v5
export class HeroDetailComponent5 implements OnChanges {
  @Input() hero: Hero;

  states = states;
  heroForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.heroForm = this.fb.group({
      name: '',
      address: this.fb.group({ // same as `new Address()`
        street: '',
        city: '',
        state: '',
        zip: ''
      })
    });
  }

  ngOnChanges() {
    this.heroForm.patchValue({
      name: this.hero.name
    });
  }
}
// #enddocregion v5

///////// 6 ////////////////////

@Component({
  moduleId: module.id,
  selector: 'hero-detail-6',
  templateUrl: './hero-detail-4.component.html'
})
// #docregion v6
export class HeroDetailComponent6 implements OnChanges {
  @Input() hero: Hero;

  states = states;
  heroForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.heroForm = this.fb.group({
      name: '',
      address: this.fb.group(new Address())
    });
  }

  // #docregion set-value
  ngOnChanges() {
    this.heroForm.reset();
    this.heroForm.setValue({
      name: this.hero.name,
      address: this.hero.addresses[0] || new Address()
    });
  }
  // #enddocregion set-value

}
// #enddocregion v6

////////// 7 ////////////////////

@Component({
  moduleId: module.id,
  selector: 'hero-detail-7',
  templateUrl: './hero-detail-5.component.html'
})
// #docregion v7
export class HeroDetailComponent7 implements OnChanges {
  @Input() hero: Hero;
  states = states;
  heroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.heroForm = this.fb.group({
      name: '',
      // #docregion addresses-refactor
      addresses: this.fb.array([])
      // #enddocregion addresses-refactor
    });
  }

  // #docregion addresses
  addressesToFormArray(addresses: Address[]): FormArray {
    return this.fb.array(addresses.map(address => this.fb.group(address)));
  }

  get addresses(): FormArray { // <--add this under heroForm
    return this.heroForm.get('addresses') as FormArray;
  };

  setAddresses(addressFormArray: FormArray) {
    this.heroForm.setControl('addresses', addressFormArray);
  }
  // #enddocregion addresses

  // #docregion add
  add() {
    this.addresses.push(this.fb.group(new Address()));
  }
  // #enddocregion add

  ngOnChanges() {
    this.heroForm.reset();
    this.heroForm.patchValue({
      name: this.hero.name
    });
    const addressFormArray = this.addressesToFormArray(this.hero.addresses);
    this.setAddresses(addressFormArray);
  }
}
// #enddocregion v7

////////////////////////////////

export const components = [
  HeroDetailComponent1,
  HeroDetailComponent2,
  HeroDetailComponent3,
  HeroDetailComponent4,
  HeroDetailComponent5,
  HeroDetailComponent6,
  HeroDetailComponent7
];
