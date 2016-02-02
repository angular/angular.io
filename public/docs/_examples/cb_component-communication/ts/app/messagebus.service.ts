// #docregion
import {Injectable, EventEmitter} from 'angular2/core';

@Injectable()
export class MessageBus {
  onMessageReceived = new EventEmitter<string>();
  
  sendMessage(message: string) {
    this.onMessageReceived.emit(message)
  }
}

export var controlMessageBus = new MessageBus();
// #enddocregion