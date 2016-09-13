// #docregion
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Hero } from '../model';

// #docregion component
@Component({
  selector:    'dashboard-hero',
  templateUrl: 'app/dashboard/dashboard-hero.component.html',
  styleUrls:  ['app/dashboard/dashboard-hero.component.css']
})
export class DashboardHeroComponent {
  @Input() hero: Hero;
  @Output() selected = new EventEmitter<Hero>();
  click() { this.selected.next(this.hero); }
}
// #enddocregion component
