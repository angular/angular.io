// #docplaster
// #docregion
import { Component }         from '@angular/core';

// #docregion import-rxjs
// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';
// #enddocregion import-rxjs

@Component({
  selector: 'my-app',
  template: `
    <hero-list></hero-list>
    <hero-list-promise></hero-list-promise>
    <my-wiki></my-wiki>
    <my-wiki-smart></my-wiki-smart>
  `
})
export class AppComponent { }
// #enddocregion
