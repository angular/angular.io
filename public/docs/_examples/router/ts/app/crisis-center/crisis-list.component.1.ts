// #docplaster
// #docregion
import { Component } from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';

import { Crisis, CrisisService } from './crisis.service';

@Component({
  // #docregion template
  template: `
    <ul class="items">
      <li *ngFor="let crisis of crises"
        (click)="onSelect(crisis)">
        <span class="badge">{{crisis.id}}</span> {{crisis.name}}
      </li>
    </ul>
  `,
  // #enddocregion template
})
export class CrisisListComponent implements OnActivate {
  crises: Crisis[];

  constructor(
    private service: CrisisService,
    private router: Router) {}

  routerOnActivate(curr: RouteSegment): void {
    this.service.getCrises().then(crises => this.crises = crises);
  }

  // #docregion select
  onSelect(crisis: Crisis) {
    this.router.navigateByUrl( `/crisis-list/${crisis.id}`);
  }
  // #enddocregion select
}
