// #docregion
import { Component } from '@angular/core';
import { HttpActivityLogger } from './http-interceptor-registry.service';

@Component({
  selector: 'my-app',
  template: `
    <hero-list></hero-list>
    <h3>HTTP Activity</h3>
    <p><i>Open the browser console to see more</i></p>
    <ol>
      <li *ngFor="let act of activities">{{act}}</li>
    </ol>
  `
})
export class AppComponent {
  activities: string[] = [];

  constructor(private logger: HttpActivityLogger) {
    this.activities = logger.logs;
  }
}
// #enddocregion
