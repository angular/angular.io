// #docregion
import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

// Initial view: "Message: "
// After 500ms: Message: You are my Hero!"

@Component({
  selector: 'hero-message',
  template: `
    <h2>Async Hero Message and AsyncPipe</h2>

    <p>Message: {{ message$ | async }}</p>

    <button (click)="resend()">Resend</button>`,
})
export class HeroAsyncMessageComponent {
  message$:Observable<string>;

  constructor() { this.resend(); }

  resend() {
    this.message$ = Observable.interval(500)
      .map(i => this.messages[i])
      .take(this.messages.length);
  }

  private messages = [
    'You are my hero!',
    'You are the best hero!',
    'Will you be my hero?'
  ];
}
// #enddocregion

// Alternative message$ formula:
// this.message$ = Observable.fromArray(this.messages)
//   .map(message => Observable.timer(500).map(() => message))
//   .concatAll();
