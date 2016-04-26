// #docregion
/**
 * AVOID THIS PATTERN
 */

import { Component } from 'angular2/core';

@Component({
  selector: 'toh-button',
  template: `<button>OK<button>`
})
export class ButtonComponent {
  onInit() { // mispelled
    console.log('The component is initialized');
  }
}
