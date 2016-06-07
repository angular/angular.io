/* tslint:disable:class-name component-class-suffix */
// #docplaster
// #docregion
import { Component } from '@angular/core';

// #docregion key-up-component-1
@Component({
  selector: 'key-up1',
// #docregion key-up-component-1-template
  template: `
    <input (keyup)="onKey($event)">
    <p>{{values}}</p>
  `
// #enddocregion key-up-component-1-template
})
// #docregion key-up-component-1-class, key-up-component-1-class-no-type
export class KeyUpComponent_v1 {
  values = '';

// #enddocregion key-up-component-1-class, key-up-component-1-class-no-type
  /*
  // #docregion key-up-component-1-class-no-type
  // without strong typing
  onKey(event:any) {
    this.values += event.target.value + ' | ';
  }
  // #enddocregion key-up-component-1-class-no-type
  */
  // #docregion key-up-component-1-class
  // with strong typing
  onKey(event: KeyboardEvent) {
    this.values += (<HTMLInputElement>event.target).value + ' | ';
  }
// #docregion key-up-component-1-class-no-type
}
// #enddocregion key-up-component-1,key-up-component-1-class, key-up-component-1-class-no-type

//////////////////////////////////////////

// #docregion key-up-component-2
@Component({
  selector: 'key-up2',
  template: `
    <input #box (keyup)="onKey(box.value)">
    <p>{{values}}</p>
  `
})
export class KeyUpComponent_v2 {
  values = '';
  onKey(value: string) {
    this.values += value + ' | ';
  }
}
// #enddocregion key-up-component-2


//////////////////////////////////////////

// #docregion key-up-component-3
@Component({
  selector: 'key-up3',
  template: `
    <input #box (keyup.enter)="values=box.value">
    <p>{{values}}</p>
  `
})
export class KeyUpComponent_v3 {
  values = '';
}
// #enddocregion key-up-component-3


//////////////////////////////////////////

// #docregion key-up-component-4
@Component({
  selector: 'key-up4',
  template: `
    <input #box
      (keyup.enter)="values=box.value"
      (blur)="values=box.value">

    <p>{{values}}</p>
  `
})
export class KeyUpComponent_v4 {
  values = '';
}
// #enddocregion key-up-component-4
