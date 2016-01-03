// #docregion
@Injectable()
export class MessageBus {
  // ...
}

@Component({
  selector: 'message-writer'
})
export class MessageWriter {
  constructor(private messageBus: MessageBus) {
    // ...
  }
}

@Component({
  selector: 'message-listener'
})
export class MessageListener {
  constructor(private messageBus: MessageBus) {
    // ...
  }
}
// #enddocregion