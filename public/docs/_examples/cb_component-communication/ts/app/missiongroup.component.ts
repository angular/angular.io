// #docregion
import {Component, Input, provide} from 'angular2/core';
import {MessageBus, controlMessageBus} from './messagebus.service';

@Component({
  selector: 'mission-group',
  template: `
    <h2>{{name}}</h2>
    <h3 *ngIf="!!actions && actions.length > 0">Actions</h3>
    <div *ngFor="#action of actions">
      <button (click)="doAction(action)">{{action}}</button>
    </div>
    <h3>Messages processed</h3>
    <ul>
      <li *ngFor="#message of messages">{{message}}</li>
    </ul>
  `,
  providers: [provide(MessageBus, {useValue: controlMessageBus})]
})
export class MissionGroup {
  @Input() name: string;
  @Input() actions: string[];
  @Input() interestedIn: string;
  
  messages: string[] = [];
  
  constructor(public messageBus: MessageBus) {
    console.log(!!messageBus);
    messageBus.onMessageReceived.subscribe((message: string) => {
      console.log(message);
      if (!this.interestedIn || message.indexOf(this.interestedIn) >= 0) {
        this.messages.push(message);
      }
    })
  }
  
  doAction(action: string) {
    this.messageBus.sendMessage(action);
  }
}
// #enddocregion