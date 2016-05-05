// #docplaster

// #docregion
import { Component, OnInit } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';

import { Crisis, CrisisService } from './crisis.service';

@Component({
  template: `
    <ul class="items">
      <li *ngFor="let crisis of crises"
        [class.selected]="isSelected(crisis)"
        (click)="onSelect(crisis)">
        <span class="badge">{{crisis.id}}</span> {{crisis.name}}
      </li>
    </ul>
  `,
})
export class CrisisListComponent implements OnInit {
  crises: Crisis[];

  private selectedId: number;

  constructor(
    private service: CrisisService,
    private router: Router,
    routeParams: RouteParams) {
      this.selectedId = +routeParams.get('id');
  }

  isSelected(crisis: Crisis) { return crisis.id === this.selectedId; }

  ngOnInit() {
    this.service.getCrises().then(crises => this.crises = crises);
  }

  onSelect(crisis: Crisis) {
    this.router.navigate( ['CrisisDetail', { id: crisis.id }]  );
  }
}
