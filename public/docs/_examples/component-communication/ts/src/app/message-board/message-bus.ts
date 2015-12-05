// #docregion
import {Injectable, EventEmitter} from 'angular2/core';

@Injectable()
export class MessageBus {
    messageReceived = new EventEmitter<string>();
    broadcastMessage(message: string) {
        console.log(message);
        this.messageReceived.next(message);
    }
}
// #enddocregion