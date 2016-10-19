import {
  Component,
  HostBinding,
  HostListener,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// #docregion
@Component({
  selector: 'heroes-bindings',
  template: `<h1 [class.active]="active">
    Tour of Heroes
  </h1>`
})
class HeroesComponent {
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

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ HeroesComponent ],
  bootstrap: [ HeroesComponent ]
})
export class HeroesHostBindingsModule { }
