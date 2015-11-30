// #docregion
import {Injectable, EventEmitter} from 'angular2/angular2';

@Injectable()
export class MessageBus {
    public broadcastMessage(message: string) {
        console.log(message);
    }
}
// #enddocregion