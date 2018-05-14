// #docregion
import {Component} from 'angular2/core';
import {OnActivate, ComponentInstruction} from 'angular2/router';

@Component({
  selector: 'home',
  template: `
    <h2>Welcome Home</h2>
    `
})
export class HomeComponent implements OnActivate {

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    return new Promise((resolve) => {
      // wait 3 seconds to simulate page load
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }
}
