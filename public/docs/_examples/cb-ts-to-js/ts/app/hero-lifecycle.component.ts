// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
// #enddocregion
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'hero-lifecycle',
  template: `<h1>Hero: {{name}}</h1>`
})
// #docregion
class HeroComponent
    implements OnInit {
  name: string;
  ngOnInit() {
    this.name = 'Windstorm';
  }
}
// #enddocregion

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ HeroComponent ],
  bootstrap: [ HeroComponent ]
})
export class HeroesLifecycleModule { }

