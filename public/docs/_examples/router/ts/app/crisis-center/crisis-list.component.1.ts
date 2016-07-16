// #docplaster
// #docregion
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';

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
export class CrisisListComponent implements OnInit, OnDestroy {
  crises: Crisis[];
  selectedId: number;
  private sub: any;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router) {}

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
    this.router.navigate(['/crisis-center', crisis.id]);
  }
  // #enddocregion select
}
