// #docregion
import { Component, Input } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'my-hero-detail',
  template: `
    <div *ngIf="hero">
      <h3>{{hero.name}} details!</h3>
      <dl>
        <dt>id:</dt>
        <dd>{{hero.id}}</dd>
      </dl>
      <div>
        <label>name: 
          <input [(ngModel)]="hero.name" placeholder="name">
        </label>
      </div>
    </div>
  `
})
export class HeroDetailComponent {
  @Input() hero: Hero;
}
