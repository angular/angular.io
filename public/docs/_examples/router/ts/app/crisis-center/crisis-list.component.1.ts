// #docplaster
// #docregion
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Crisis, CrisisService } from './crisis.service';
import { Observable }            from 'rxjs/Observable';

@Component({
  // #docregion template
  template: `
    <ul class="items">
      <li *ngFor="let crisis of crises | async"
        (click)="onSelect(crisis)">
        <span class="badge">{{ crisis.id }}</span> {{ crisis.name }}
      </li>
    </ul>
  `,
  // #enddocregion template
})
export class CrisisListComponent implements OnInit {
  crises: Observable<Crisis[]>;
  selectedId: number;

  // #docregion relative-navigation-ctor
  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  // #enddocregion relative-navigation-ctor

  ngOnInit() {
    this.crises = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getCrises();
      });
  }

  // #docregion select
  onSelect(crisis: Crisis) {
    // Absolute link
    this.router.navigate([crisis.id]);
  }
  // #enddocregion select
}
// #enddocregion

/*
// #docregion relative-navigation-router-link
<a [routerLink]="[crisis.id]">{{ crisis.name }}</a>
// #enddocregion relative-navigation-router-link
*/
