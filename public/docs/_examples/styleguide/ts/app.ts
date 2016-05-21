// #docregion
// #docregion import
import { Component } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

// #enddocregion

// #docregion class-w-annotations
@Component({
  selector: 'my-app',
  template: '<h1 id="output">My First Angular 2 App</h1>'
})
// #docregion class
class AppComponent { }
// #enddocregion
// #enddocregion

// #docregion bootstrap
bootstrap(AppComponent);
// #enddocregion
// #enddocregion
