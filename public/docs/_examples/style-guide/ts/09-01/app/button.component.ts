// #docregion
import {Component, OnInit} from 'angular2/core';

@Component({
  selector: 'toh-button',
  template: `<button>OK<button>`
})
export class ButtonComponent implements OnInit {
  ngOnInit() {
    console.log('The component is initialized');
  }
}
