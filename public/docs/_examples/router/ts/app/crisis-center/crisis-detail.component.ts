// #docplaster
// #docregion
import { Component } from '@angular/core';
import { CanDeactivate, OnActivate, Router, RouteSegment } from '@angular/router';

import { Crisis, CrisisService } from './crisis.service';
import { DialogService } from '../dialog.service';

@Component({
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
  styles: ['input {width: 20em}']
})

export class CrisisDetailComponent implements OnActivate, CanDeactivate {
  crisis: Crisis;
  editName: string;
  private curSegment: RouteSegment;

  constructor(
    private service: CrisisService,
    private router: Router,
    private dialog: DialogService
    ) { }

  routerOnActivate(curr: RouteSegment) {
    this.curSegment = curr;

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

  routerCanDeactivate(): any {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged.
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialog.confirm('Discard changes?');
  }

  cancel() {
    this.editName = this.crisis.name;
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  // #docregion gotoCrises
  gotoCrises() {
    let crisisId = this.crisis ? this.crisis.id : null;
    // Pass along the hero id if available
    // so that the CrisisListComponent can select that hero.
    // Add a totally useless `foo` parameter for kicks.
    // #docregion gotoCrises-navigate
    // Absolute link
    this.router.navigate(['/crisis-center', {id: crisisId, foo: 'foo'}]);

    // Relative link
    // this.router.navigate(['../', {id: crisisId, foo: 'foo'}], this.curSegment);
    // #enddocregion gotoCrises-navigate
  }
  // #enddocregion gotoCrises
}
