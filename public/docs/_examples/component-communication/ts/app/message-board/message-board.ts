// #docregion
// #docregion component
import {Component, provide} from 'angular2/core';
import {MessageBus, theMessageBus} from './message-bus';

@Component({
  selector: 'message-board',
  templateUrl: 'app/message-board/message-board-template.html',
  styleUrls: ['app/hero-job-board.css'],
  providers: [provide(MessageBus, {useValue: theMessageBus})]
})
// #enddocregion component
// #docregion class
export class MessageBoard {
  private messages: string[] = [];
  constructor(private messageBus: MessageBus) {
    messageBus.messageReceived.subscribe(
      (msg:string) => {
        this.messages.push(msg);
      })
  }
}
// #enddocregion class
// #enddocregion
