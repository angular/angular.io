// #docregion
import {Component, Input} from 'angular2/core';

@Component({
  selector: 'my-child',
  template: `
  <div class="my-child">
    <div>-- child view begins --</div>
    <div class="child">{{hero}} is my hero.</div>
    <div>-- child view ends --</div>
  </div>
  `,
  styles: [
    '.child {background: Yellow; padding: 8px; }',
    '.my-child {background: LightYellow; padding: 8px; margin-top: 8px}'
  ]
})
export class ChildComponent {
  @Input() hero: string;
}