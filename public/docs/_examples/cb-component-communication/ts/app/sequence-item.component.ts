import {Component, Input} from 'angular2/core';

@Component({
  selector: 'sequence-item',
  template: '<li>Item[{{index}}] = {{value}}</li>'
})
export class SequenceItemComponent {
  @Input() index: number;
  @Input() value: number;
}