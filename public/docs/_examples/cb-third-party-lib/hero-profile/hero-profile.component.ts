// #docregion
import { Component, Input } from '@angular/core';

import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'hero-profile',
  templateUrl: 'hero-profile.component.html',
  styleUrls: ['hero-profile.component.css']
})
export class HeroProfileComponent {
  @Input() hero: Hero;
}
