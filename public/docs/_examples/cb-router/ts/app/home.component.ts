// #docplaster
// #docregion
// #docregion page-title
import {Component} from 'angular2/core';
import {OnActivate, ComponentInstruction} from 'angular2/router';
// #docregion page-title
import {Title} from 'angular2/platform/browser';

@Component({
  selector: 'home',
  template: `
    <h2>Welcome Home</h2>
    `
})
export class HomeComponent implements OnActivate {
  // #docregion page-title
  pageTitle: string = 'Home';

  constructor(private _title: Title) {}

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    // #docregion page-title
    this._title.setTitle(this.pageTitle);
    // #enddocregion page-title

    return new Promise((resolve) => {
      // wait 3 seconds to simulate page load
      setTimeout(() => {
        resolve();
      }, 3000);
    });
    // #docregion page-title
  }
}
