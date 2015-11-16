import {Injectable, EventEmitter} from 'angular2/angular2';

@Injectable()
export class MessageBus {
    public messageReceived = new EventEmitter();
    public broadcastMessage(message: string) {
        console.log(message);
        this.messageReceived.next(message);
    }
}