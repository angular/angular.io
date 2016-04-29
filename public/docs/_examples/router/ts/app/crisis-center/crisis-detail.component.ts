// #docplaster
// #docregion
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

export class CrisisDetailComponent implements OnInit, OnDestroy {
  crisis: Crisis;
  editName: string;
  private curSegment: RouteSegment;
  private sub: any;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: DialogService
    ) { }

  ngOnInit() {
    this.sub = this.route
      .params
      .subscribe(params => {
        let id =+ params['id'];
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  cancel() {
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
    this.router.navigate(['../', {id: crisisId, foo: 'foo'}], { relativeTo: this.route });
    // #enddocregion gotoCrises-navigate
  }
  // #enddocregion gotoCrises
}
