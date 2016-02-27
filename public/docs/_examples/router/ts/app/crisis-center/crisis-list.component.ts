// #docplaster

// #docregion
import {Component, OnInit} from 'angular2/core';
import {Crisis, CrisisService} from './crisis.service';
import {Router, RouteParams} from 'angular2/router';

@Component({
  template: `
    <ul class="items">
      <li *ngFor="#crisis of crises"
        [class.selected]="isSelected(crisis)"
        (click)="onSelect(crisis)">
        <span class="badge">{{crisis.id}}</span> {{crisis.name}}
      </li>
    </ul>
  `,
})
export class CrisisListComponent implements OnInit {
  crises: Crisis[];

  private _selectedId: number;

  constructor(
    private _service: CrisisService,
    private _router: Router,
    routeParams: RouteParams) {
      this._selectedId = +routeParams.get('id');
  }

  isSelected(crisis: Crisis) { return crisis.id === this._selectedId; }

  ngOnInit() {
    this._service.getCrises().then(crises => this.crises = crises);
  }

  onSelect(crisis: Crisis) {
    this._router.navigate( ['CrisisDetail', { id: crisis.id }]  );
  }
}
