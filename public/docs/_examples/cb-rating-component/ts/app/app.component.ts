import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <p>
      <label>Windstorm: </label>
      <my-hero-rating rate="5"></my-hero-rating>
    </p>
    <p>
      <label>Bombasto: </label>
      <my-hero-rating [(rate)]="bombasto"></my-hero-rating>
    </p>
    <div>Bombasto rate is {{bombasto}}</div>
  `
})
export class AppComponent {
  bombasto = 1;
}
