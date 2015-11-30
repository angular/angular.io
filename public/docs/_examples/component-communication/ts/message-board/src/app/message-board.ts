// #docregion
import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {MessageBus} from './message-bus';

@Component({
    selector: 'message-board',
    template: `
        <div class='message-board'
            [hidden]='messages.length==0'>
            <ul>
                <li class='message' *ng-for='#msg of messages'>
                {{msg}}
                </li>
            </ul>
        </div>
    `,
    styles: [`
        .message-board {
            border: 2px solid blue;
            margin: 0 8px;
        }
        .message {
            color: blue;
            list-style-type: square;
        }
    `],
    directives: [CORE_DIRECTIVES]
})
export class MessageBoard {
    private messages: string[] = [];
    constructor(private messageBus: MessageBus) {
        messageBus.messageReceived.subscribe(
            msg => {
                this.messages.push(msg);
            })
    }
}
// #enddocregion