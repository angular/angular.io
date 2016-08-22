import { Component, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// #docregion
@Component({
  selector: 'hero-di-inject',
  template: `<h1>Hero: {{name}}</h1>`
})
class HeroComponent {
  constructor(
    @Inject('heroName')
      private name: string) {
  }
}
// #enddocregion

@NgModule({
  imports: [ BrowserModule ],
  providers: [ { provide: 'heroName', useValue: 'Windstorm' } ],
  declarations: [ HeroComponent ],
  bootstrap: [ HeroComponent ]
})
export class HeroesDIInjectModule { }
