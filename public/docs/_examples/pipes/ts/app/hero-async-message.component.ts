// #docregion
import {Component} from 'angular2/core';

// Initial view: "Message: "
// After 500ms: Message: You are my Hero!"

@Component({
  selector: 'hero-message',
  template: 'Message: {{delayedMessage | async}}',
})
export class HeroAsyncMessageComponent {
  delayedMessage:Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => resolve('You are my Hero!'), 500);
  });
}
