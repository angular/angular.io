import {Component, Input} from 'angular2/core';
import {Hero} from './hero';

// #docregion inlinestyles
@Component({
  selector: 'hero-controls',
  template: `
    <style>
      button {
        background-color: white;
        border: 1px solid #777;
      }
    </style>
    <h3>Controls</h3>
    <button (click)="activate()">Activate</button>
  `
})
export class HeroControlsComponent {
// #enddocregion inlinestyles

  @Input() hero:Hero;

  activate() {
    this.hero.active = true;
  }
}
