import {Component} from '@angular/core';
import {Crisis, CrisisService} from './crisis.service';
import {DialogService} from '../dialog.service';
import {CanDeactivate, ComponentInstruction, Router} from '@angular/router';

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
    private _service: CrisisService,
    private _router: Router,
    private _dialog: DialogService) { }

  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
    return !!this.editName.trim() ||
           this._dialog.confirm('Discard changes?');
  }

  cancel() { this.gotoCrises(); }

  save() {
    this._service.addCrisis(this.editName);
    this.gotoCrises();
  }

  gotoCrises() {
    this._router.navigate(['CrisisCenter']);
  }
}