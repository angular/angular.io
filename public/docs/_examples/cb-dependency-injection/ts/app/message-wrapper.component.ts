// #docregion
import {Component, Inject} from 'angular2/core';

@Component({
  selector: 'message-wrapper',
  template: `
    <label>Original message:</label>
    <input #original (keyup)="0">
    <p>Encoded message:
      <code>{{wrapMessage(original.value)}}</code>
    </p>
  `
})
export class MessageWrapperComponent {
  constructor(
    @Inject('wrapper.prefix') private _prefix: string,
    @Inject('wrapper.suffix') private _suffix: string) {}
    
    wrapMessage(original: string) {
      return this._prefix + original + this._suffix; 
    }
}
// #enddocregion