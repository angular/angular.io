// #docregion
import { Component } from  '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div id="hero-wrapper">
      <h2>Hero Assignments</h2>
      <div *ngFor="let assignment of assignments">
        <cb-assignment [title]="assignment"></cb-assignment>
      </div>
      <div class="heroList">
        <div *ngFor="let hero of heroes">
          <cb-hero (remove)="removeHero($event)" [name]="hero"></cb-hero>
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  heroes = ['Mr. Nice',
            'Bombasto',
            'Celeritas',
            'Tornado'];

  assignments = ['Help Granny cross the street',
                 'Rescue village from dragon(s)',
                 'Rescue princess from tower'];

  removeHero(heroToRemove: string): void {
    this.heroes = this.heroes.filter(hero => hero !== heroToRemove);
  }
}
