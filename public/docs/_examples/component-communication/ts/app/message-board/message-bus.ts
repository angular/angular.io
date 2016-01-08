// #docregion
// #docregion component
import {Injectable, EventEmitter} from 'angular2/core';

@Injectable()
export class MessageBus {
    messageReceived = new EventEmitter<string>();
    broadcastMessage(message: string) {
        console.log(message);
        this.messageReceived.emit(message);
    }
}
// #enddocregion component
// #docregion export
export var theMessageBus = new MessageBus();
// #enddocregion export

// #enddocregion
