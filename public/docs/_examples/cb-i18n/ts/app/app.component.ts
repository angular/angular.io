// #docregion
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  wolves = 5;
  sex = 'f';
  fly = true;
  logo = 'https://angular.io/resources/images/logos/angular2/angular.png';
}

