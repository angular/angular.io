// #docplaster
// #docregion
import { Component } from 'angular2/core';
import { Crisis, CrisisService } from './crisis.service';
import { Router, OnActivate, RouteSegment } from 'angular2/alt_router';

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
    private _service: CrisisService,
    private _router: Router) {}

  routerOnActivate(curr: RouteSegment): void {
    this._service.getCrises().then(crises => this.crises = crises);
  }

  // #docregion select
  onSelect(crisis: Crisis) {
    this._router.navigateByUrl( `/crisis-list/${crisis.id}`);
  }
  // #enddocregion select
}
