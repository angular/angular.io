// #docregion
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
  <div class="container">
    <h1>Reactive Forms</h1>
    <hero-list></hero-list>
  </div>`
})
export class AppComponent { }
