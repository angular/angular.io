import { Component } from '@angular/core';
import { CanDeactivate, ComponentInstruction, Router } from '@angular/router-deprecated';

import { Crisis, CrisisService } from './crisis.service';
import { DialogService } from '../dialog.service';

@Component({
  template: `
  <h2>"{{editName}}"</h2>
  <div>
    <label>Name: </label>
    <input [(ngModel)]="editName" placeholder="name"/>
  </div>
  <button (click)="save()">Save</button>
  <button (click)="cancel()">Cancel</button>
  `,
  styles: ['input {width: 20em}']
})
export class AddCrisisComponent implements CanDeactivate {
  editName: string;

  constructor(
    private service: CrisisService,
    private router: Router,
    private dialog: DialogService) { }

  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    return !!this.editName.trim() ||
           this.dialog.confirm('Discard changes?');
  }

  cancel() { this.gotoCrises(); }

  save() {
    this.service.addCrisis(this.editName);
    this.gotoCrises();
  }

  gotoCrises() {
    this.router.navigate(['CrisisCenter']);
  }
}