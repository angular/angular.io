// #docregion
import {Component} from 'angular2/core';
import {MessageBus} from './message-bus';

@Component({
  selector: 'message-board',
  template: `
    <div class='message-board'
      [hidden]='messages.length==0'>
      <ul>
        <li class='message' *ngFor='#msg of messages'>
          {{msg}}
        </li>
      </ul>
    </div>
    `,
  styleUrls: ['app/hero-job-board.css']
})
export class MessageBoard {
  private messages: string[] = [];
  constructor(private messageBus: MessageBus) {
    messageBus.messageReceived.subscribe(
      (msg:string) => {
        this.messages.push(msg);
      })
  }
}
// #enddocregion