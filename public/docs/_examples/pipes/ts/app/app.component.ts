// #docregion
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  birthday = new Date(1988, 3, 15); // April 15, 1988
}
