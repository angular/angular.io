// #docplaster

// #docregion
import {Component, OnInit} from 'angular2/core';
import {Crisis, CrisisService} from './crisis.service';
import {RouteParams, Router} from 'angular2/router';
// #docregion ngCanDeactivate
import {CanDeactivate, ComponentInstruction} from 'angular2/router';
import {DialogService} from '../dialog.service';

// #enddocregion ngCanDeactivate

@Component({
  // #docregion template
  template: `
  <div *ngIf="crisis">
    <h3>"{{editName}}"</h3>
    <div>
      <label>Id: </label>{{crisis.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="editName" placeholder="name"/>
    </div>
    <button (click)="save()">Save</button>
    <button (click)="cancel()">Cancel</button>
  </div>
  `,
  // #enddocregion template
  styles: ['input {width: 20em}']
})
// #docregion ngCanDeactivate, cancel-save
export class CrisisDetailComponent implements OnInit, CanDeactivate {

  public crisis: Crisis;
  public editName: string;

// #enddocregion ngCanDeactivate, cancel-save
  constructor(
    private _service: CrisisService,
    private _router: Router,
    private _routeParams: RouteParams,
    private _dialog: DialogService
    ) { }

  // #docregion ngOnInit
  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._service.getCrisis(id).then(crisis => {
      if (crisis) {
        this.editName = crisis.name;
        this.crisis = crisis;
      } else { // id not found
        this.gotoCrises();
      }
    });
  }
  // #enddocregion ngOnInit

  // #docregion canDeactivate
  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    // Allow navigation (`true`) if no crisis or the crisis is unchanged.
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves true-or-false when the user decides
    return !this.crisis ||
           this.crisis.name === this.editName ||
           this._dialog.confirm('Discard changes?');
  }
  // #enddocregion canDeactivate

  // #docregion cancel-save
  cancel() {
    this.editName = this.crisis.name;
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }
  // #enddocregion cancel-save

  // #docregion gotoCrises
  gotoCrises() {
    let route =
      ['CrisisList',  {id: this.crisis ? this.crisis.id : null} ]

    this._router.navigate(route);
  }
  // #enddocregion gotoCrises
// #docregion ngCanDeactivate, cancel-save
}
// #enddocregion ngCanDeactivate, cancel-save
// #enddocregion
