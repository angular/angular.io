// #docplaster
// #docregion
import { Component } from '@angular/core';
import { OnActivate, Router, RouteSegment } from '@angular/router';

import { Crisis, CrisisService } from './crisis.service';
// #docregion routerCanDeactivate
// import { CanDeactivate } from '@angular/router';
import { DialogService } from '../dialog.service';

// #enddocregion routerCanDeactivate
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
export class CrisisDetailComponent implements OnActivate {// , CanDeactivate {

  crisis: Crisis;
  editName: string;

// #enddocregion routerCanDeactivate, cancel-save
  constructor(
    private service: CrisisService,
    private router: Router,
    private dialog: DialogService
    ) { }

  // #docregion ngOnActivate
  routerOnActivate(curr: RouteSegment): void {
    let id = +curr.getParam('id');
    this.service.getCrisis(id).then(crisis => {
      if (crisis) {
        this.editName = crisis.name;
        this.crisis = crisis;
      } else { // id not found
        this.gotoCrises();
      }
    });
  }
  // #enddocregion ngOnActivate

  // #docregion routerCanDeactivate
  // NOT IMPLEMENTED YET
  routerCanDeactivate(): any {
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
    // Like <a [routerLink]="[/crisis-center/]">Crisis Center</a
    this.router.navigateByUrl('/crisis-center/'); // absolute url
  }
  // #enddocregion gotoCrises
// #docregion routerCanDeactivate, cancel-save
}
// #enddocregion routerCanDeactivate, cancel-save
// #enddocregion
