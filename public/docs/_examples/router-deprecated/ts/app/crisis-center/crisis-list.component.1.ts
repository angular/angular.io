// #docplaster

// #docregion
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

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
export class CrisisListComponent implements OnInit {
  crises: Crisis[];

  constructor(
    private service: CrisisService,
    private router: Router) {}

  ngOnInit() {
    this.service.getCrises().then(crises => this.crises = crises);
  }

  // #docregion select
  onSelect(crisis: Crisis) {
    this.router.navigate(['CrisisDetail', { id: crisis.id }]  );
  }
  // #enddocregion select
}
