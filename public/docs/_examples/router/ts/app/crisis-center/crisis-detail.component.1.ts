// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Crisis, CrisisService }  from './crisis.service';
import { DialogService }          from '../dialog.service';
import { Observable }             from 'rxjs/Observable';

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
// #docregion cancel-save
export class CrisisDetailComponent implements OnInit {
  crisis: Crisis;
  editName: string;

// #enddocregion cancel-save
  constructor(
    private service: CrisisService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogService: DialogService
  ) { }

  // #docregion ngOnInit
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
        let id = +params['id'];
        this.service.getCrisis(id)
          .then(crisis => {
            if (crisis) {
              this.editName = crisis.name;
              this.crisis = crisis;
            } else { // id not found
              this.gotoCrises();
            }
          });
      });
  }
  // #enddocregion ngOnInit

  // #docregion cancel-save
  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }
  // #enddocregion cancel-save

  // #docregion cancel-save-only
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
  // #enddocregion cancel-save-only

  // #docregion gotoCrises, relative-navigation
  gotoCrises() {
    let crisisId = this.crisis ? this.crisis.id : null;
    // Pass along the crisis id if available
    // so that the CrisisListComponent can select that crisis.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }
  // #enddocregion gotoCrises, relative-navigation
// #docregion cancel-save
}
// #enddocregion cancel-save
// #enddocregion
