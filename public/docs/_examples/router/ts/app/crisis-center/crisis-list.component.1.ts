// #docplaster
// #docregion
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';

import { Crisis, CrisisService } from './crisis.service';
import { Subscription }          from 'rxjs/Subscription';

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
export class CrisisListComponent implements OnInit, OnDestroy {
  crises: Crisis[];
  selectedId: number;
  private sub: Subscription;

  // #docregion relative-navigation-ctor
  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router) {}
  // #enddocregion relative-navigation-ctor

  ngOnInit() {
    this.sub = this.route
      .params
      .subscribe(params => {
        this.selectedId = +params['id'];
        this.service.getCrises()
          .then(crises => this.crises = crises);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
