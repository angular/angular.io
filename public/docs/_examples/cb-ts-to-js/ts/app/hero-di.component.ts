import {Component} from 'angular2/core';
import {DataService} from './data.service';

// #docregion
@Component({
  selector: 'hero-di',
  template: `<h1>Hero: {{name}}</h1>`
})
export class HeroComponent {
  name:string;
  constructor(dataService:DataService) {
    this.name = dataService.getHeroName();
  }
}
// #enddocregion
