import { Component, HostBinding, HostListener } from '@angular/core';

// #docregion
@Component({
  selector: 'heroes-bindings',
  template: `<h1 [class.active]="active">
    Tour ofHeroes
  </h1>`
})
export class HeroesComponent {
  @HostBinding() title = 'Tooltip content';
  @HostBinding('class.heading')
    hClass = true;
  active: boolean;

  constructor() {}

  @HostListener('click')
  clicked() {
    this.active = !this.active;
  }

  @HostListener('dblclick', ['$event'])
  doubleClicked(evt: Event) {
    this.active = true;
  }
}
// #enddocregion
