import {
  Component,
  EventEmitter,
  Input,
  Output,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// #docregion
class ConfirmComponent {
  constructor(){
    this.ok = new EventEmitter();
    this.notOk = new EventEmitter();
  }
  onOkClick() {
    this.ok.next(true);
  }
  onNotOkClick() {
    this.notOk.next(true);
  }
}

ConfirmComponent.annotations = [
  new Component({
    moduleId: module.id,
    selector: 'my-confirm',
    templateUrl: 'confirm.component.html',
    inputs: [
      'okMsg',
      'notOkMsg: cancelMsg'
    ],
    outputs: [
      'ok',
      'notOk: cancel'
    ]
  })
];
// #enddocregion

class AppComponent {
  constructor(){
  }
  onOk() {
    this.okClicked = true;
  }
  onCancel() {
    this.cancelClicked = true;
  }
}

AppComponent.annotations = [
  new Component({
    selector: 'hero-io',
    template: `
      <my-confirm [okMsg]="'OK'"
                  [cancelMsg]="'Cancel'"
                  (ok)="onOk()"
                  (cancel)="onCancel()">
      </my-confirm>
      <span *ngIf="okClicked">OK clicked</span>
      <span *ngIf="cancelClicked">Cancel clicked</span>
    `
  })
];


export class HeroesIOModule { }

HeroesIOModule.annotations = [
  new NgModule({
    imports: [ BrowserModule ],
    declarations: [
      AppComponent,
      ConfirmComponent
    ],
    bootstrap: [ AppComponent ]
  })
];
