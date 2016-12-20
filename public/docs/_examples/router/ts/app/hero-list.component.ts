/// Initial empty version
// #docregion
import { Component } from '@angular/core';

@Component({
  template: `
    <h2>HEROES</h2>
    <p>Get your heroes here</p>

    <button routerLink="/sidekicks">Go To Sidekicks</button>
  `
})
export class HeroListComponent { }
