// #docregion
import {Component, Input, provide} from 'angular2/core';
import {MessageBus, controlMessageBus} from './message-bus.service';

@Component({
  selector: 'message-board',
  template: `
    <h2>Message Board</h2>
    <h4>Count of messages: {{messages.length}}</h4>
    <ul>
      <li *ngFor="#message of messages">{{message}}</li>
    </ul>
  `,
  providers: [provide(MessageBus, {useValue: controlMessageBus})]
})
export class MessageBoardComponent
 {
  messages: string[] = [];
  
  constructor(public messageBus: MessageBus) {
    messageBus.onMessageReceived.subscribe((message: string) => {
      this.messages.push(message);
    })
  }
}
// #enddocregion