import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DataService } from './data.service';

// #docregion
@Component({
  selector: 'hero-di',
  template: `<h1>Hero: {{name}}</h1>`
})
class HeroComponent {
  name: string;
  constructor(dataService: DataService) {
    this.name = dataService.getHeroName();
  }
}
// #enddocregion

@NgModule({
  imports: [ BrowserModule ],
  providers: [ DataService ],
  declarations: [ HeroComponent ],
  bootstrap: [ HeroComponent ]
})
export class HeroesDIModule { }
