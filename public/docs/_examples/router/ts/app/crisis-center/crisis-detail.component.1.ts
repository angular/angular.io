// #docplaster
// #docregion
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { Observable }                   from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { Crisis, CrisisService }  from './crisis.service';
import { DialogService }          from '../dialog.service';



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
export class CrisisDetailComponent implements OnInit, OnDestroy {

  crisis: Crisis;
  editName: string;
  // #enddocregion ngOnDestroy
  private sub: any;
  // #enddocregion ngOnDestroy

// #enddocregion cancel-save
  constructor(
    private service: CrisisService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) { }

  // #docregion ngOnInit
  ngOnInit() {
    this.sub = this.route
      .params
      .subscribe(params => {
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

  // #enddocregion ngOnDestroy
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  // #enddocregion ngOnDestroy

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
  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    let p = this.dialogService.confirm('Discard changes?');
    let o = Observable.fromPromise(p);
    return o;
  }
  // #enddocregion cancel-save-only

  // #docregion gotoCrises
  gotoCrises() {
    let crisisId = this.crisis ? this.crisis.id : null;
    // Pass along the hero id if available
    // so that the CrisisListComponent can select that hero.
    // Add a totally useless `foo` parameter for kicks.
    this.router.navigate(['/crisis-center', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }
  // #enddocregion gotoCrises
// #docregion cancel-save
}
// #enddocregion cancel-save
// #enddocregion
