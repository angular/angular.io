// #docregion

import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sg-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  destinationUrl: string = 'http://angular.io';

  alertUser() {
    alert('You have been alerted!');
  }

}
