// #docregion
import {Component, provide} from 'angular2/core';
import {MessageWrapperComponent} from './message-wrapper.component';

@Component({
  selector: 'my-message-encoder',
  template: `
    <h2>Message Encoder</h2>
    <message-wrapper></message-wrapper>
  `,
  directives: [MessageWrapperComponent],
  providers: [
    provide('wrapper.prefix', {useValue: '<<$'}),
    provide('wrapper.suffix', {useValue: '$#>>'}),
  ]
})
export class MessageEncoderComponent { }
// #enddocregion
