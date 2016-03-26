// #docplaster
// #docregion
import 'dart:html';

import 'package:angular2/core.dart';

// #docregion key-up-component-1
@Component(
    selector: 'key-up1',
// #docregion key-up-component-1-template
    template: '''
      <input (keyup)="onKey(\$event)">
      <p>{{values}}</p>
    '''
// #enddocregion key-up-component-1-template
    )
// #docregion key-up-component-1-class, key-up-component-1-class-no-type
class KeyUpComponentV1 {
  String values = '';

  // #enddocregion key-up-component-1-class, key-up-component-1-class-no-type
  /*
  // #docregion key-up-component-1-class-no-type
  onKey(dynamic event) {
    values += event.target.value + ' | ';
  }
  // #enddocregion key-up-component-1-class-no-type
  */
  // #docregion key-up-component-1-class
  onKey(KeyboardEvent event) {
    InputElement el = event.target;
    values += '${el.value}  | ';
  }
// #docregion key-up-component-1-class-no-type
}
// #enddocregion key-up-component-1,key-up-component-1-class, key-up-component-1-class-no-type

//////////////////////////////////////////

// #docregion key-up-component-2
@Component(
    selector: 'key-up2',
    template: '''
      <input #box (keyup)="onKey(box.value)">
      <p>{{values}}</p>
    ''')
class KeyUpComponentV2 {
  String values = '';
  onKey(value) {
    values += '$value | ';
  }
}
// #enddocregion key-up-component-2

//////////////////////////////////////////

// #docregion key-up-component-3
@Component(
    selector: 'key-up3',
    template: '''
      <input #box (keyup.enter)="values=box.value">
      <p>{{values}}</p>
    ''')
class KeyUpComponentV3 {
  String values = '';
}
// #enddocregion key-up-component-3

//////////////////////////////////////////

// #docregion key-up-component-4
@Component(
    selector: 'key-up4',
    template: '''
      <input #box
        (keyup.enter)="values=box.value"
        (blur)="values=box.value">
      <p>{{values}}</p>
    ''')
class KeyUpComponentV4 {
  String values = '';
}
// #enddocregion key-up-component-4
