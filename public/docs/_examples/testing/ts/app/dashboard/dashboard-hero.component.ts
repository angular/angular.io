// #docregion
import { Component, EventEmitter, Input, Output
} from '@angular/core';

import { Hero } from '../hero/hero';

@Component({
  selector: 'dashboard-hero',
  template: '<div class="hero" (click)="click()">{{hero.name | uppercase}}</div>',
  styleUrls: ['app/dashboard/dashboard-hero.component.css']
})
export class DashboardHeroComponent {
  @Input() hero: Hero;
  @Output() selected = new EventEmitter<Hero>();
  click() { this.selected.next(this.hero); }
}
