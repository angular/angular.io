import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sg-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  hero: any;

  constructor() {
    this.hero = {name: 'Windstorm', power: 'Air'};
  }

}
