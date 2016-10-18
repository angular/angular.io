// #docplaster

// #docregion
import { Component, OnInit } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';
// #docregion routerCanDeactivate
import { CanDeactivate, ComponentInstruction } from '@angular/router-deprecated';

import { DialogService } from '../dialog.service';

// #enddocregion routerCanDeactivate
import { Crisis, CrisisService } from './crisis.service';

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
    <p>
      <button (click)="save()">Save</button>
      <button (click)="cancel()">Cancel</button>
    </p>
  </div>
  `,
  // #enddocregion template
  styles: ['input {width: 20em}']
})
// #docregion routerCanDeactivate, cancel-save
export class CrisisDetailComponent implements OnInit, CanDeactivate {

  crisis: Crisis;
  editName: string;

// #enddocregion routerCanDeactivate, cancel-save
  constructor(
    private service: CrisisService,
    private router: Router,
    private routeParams: RouteParams,
    private dialog: DialogService
    ) { }

  // #docregion ngOnInit
  ngOnInit() {
    let id = +this.routeParams.get('id');
    this.service.getCrisis(id).then(crisis => {
      if (crisis) {
        this.editName = crisis.name;
        this.crisis = crisis;
      } else { // id not found
        this.gotoCrises();
      }
    });
  }
  // #enddocregion ngOnInit

  // #docregion routerCanDeactivate
  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction): any {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged.
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialog.confirm('Discard changes?');
  }
  // #enddocregion routerCanDeactivate

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
    // Like <a [routerLink]="['CrisisList']">Crisis Center</a
    this.router.navigate(['CrisisList']);
  }
  // #enddocregion gotoCrises
// #docregion routerCanDeactivate, cancel-save
}
// #enddocregion routerCanDeactivate, cancel-save
// #enddocregion
