// #docregion
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
    selector: 'my-app',
    template: `
      <h1>Reactive-Forms</h1>
      <div class="container">
        <hero-signup></hero-signup>
        <hero-signup-1></hero-signup-1>
        <hero-signup-2></hero-signup-2>
        <hero-signup-3></hero-signup-3>
        <hero-signup-4></hero-signup-4>
        <hero-signup-5></hero-signup-5>
        <hero-signup-6></hero-signup-6>
      </div>`
})
export class DemoComponent { }
