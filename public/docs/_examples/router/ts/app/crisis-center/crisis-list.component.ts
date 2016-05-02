// #docplaster
// #docregion
import { Component } from '@angular/core';
import { Crisis, CrisisService } from './crisis.service';
import { Router, OnActivate, RouteSegment, RouteTree } from '@angular/router';

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
export class CrisisListComponent implements OnActivate {
  crises: Crisis[];
  private currSegment: RouteSegment;
  private selectedId: number;

  constructor(
    private service: CrisisService,
    private router: Router) { }

  isSelected(crisis: Crisis) { return crisis.id === this.selectedId; }

  routerOnActivate(curr: RouteSegment, prev: RouteSegment, currTree: RouteTree) {
    this.currSegment = curr;
    this.selectedId = +currTree.parent(curr).getParam('id');
    this.service.getCrises().then(crises => this.crises = crises);
  }

  onSelect(crisis: Crisis) {
    // Absolute link
    // this.router.navigate([`/crisis-center`, crisis.id]);

    // Relative link
    this.router.navigate([`./${crisis.id}`], this.currSegment);
  }
}
