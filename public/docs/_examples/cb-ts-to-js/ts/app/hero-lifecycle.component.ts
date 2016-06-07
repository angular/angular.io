// #docplaster
// #docregion
import { Component, OnInit }
  from '@angular/core';
  // #enddocregion

@Component({
  selector: 'hero-lifecycle',
  template: `<h1>Hero: {{name}}</h1>`
})
// #docregion
export class HeroComponent
    implements OnInit {
  name: string;
  ngOnInit() {
    this.name = 'Windstorm';
  }
}
// #enddocregion
