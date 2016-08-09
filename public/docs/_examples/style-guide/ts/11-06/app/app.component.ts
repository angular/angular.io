import { Component } from '@angular/core';
import { Hero } from './heroes';

@Component({
  moduleId: module.id,
  selector: 'sg-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  hero: Hero;

  constructor() {
    this.hero = new Hero();
  }

  assignPower(power: string) {
    this.hero.power = power;
  }

  checkPower(power: string): boolean {
    return this.hero.power === power;
  }

}
