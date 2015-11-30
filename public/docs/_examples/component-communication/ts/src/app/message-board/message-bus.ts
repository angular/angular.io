import {Injectable, EventEmitter} from 'angular2/angular2';

@Injectable()
export class MessageBus {
    messageReceived = new EventEmitter<string>();
    broadcastMessage(message: string) {
        console.log(message);
        this.messageReceived.next(message);
    }
}
