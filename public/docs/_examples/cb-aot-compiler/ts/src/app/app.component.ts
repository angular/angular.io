// #docregion
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  showHeading = true;
  heroes = ['Magneta', 'Bombasto', 'Magma', 'Tornado'];

  toggleHeading() {
    this.showHeading = !this.showHeading;
  }
}
