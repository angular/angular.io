// #docregion
library user_input.key_up_components;

import 'package:angular2/angular2.dart';

@Component(selector: 'key-up')
@View(
    template: '''<h4>Give me some keys!</h4>
    <div><input (keyup)="onKey(\$event)"><div>
    <div>{{values}}</div>''')
class KeyUpComponent {
  String values = '';
  onKey(event) {
    values += event.target.value + ' | ';
  }
}

@Component(selector: 'key-up2')
@View(
    template: '''<h4>Give me some more keys!</h4>
    <div><input #box (keyup)="onKey(box.value)"><div>
    <div>{{values}}</div>''')
class KeyUpComponentV2 {
  String values = '';
  onKey(value) {
    values += value + ' | ';
  }
}

@Component(selector: 'key-up3')
@View(
    template: '''<h4>Type away! Press [enter] when done</h4>
    <div><input #box (keyup.enter)="values=box.value"><div>
    <div>{{values}}</div>''')
class KeyUpComponentV3 {
  String values = '';
}

@Component(selector: 'key-up4')
@View(
    template: '''<h4>Type away! Press [enter] or mouse away when done.</h4>
    <div>
      <input #box
        (keyup.enter)="values=box.value"
        (blur)="values=box.value">
    <div>
    <div>{{values}}</div>''')
class KeyUpComponentV4 {
  String values = '';
}
