import { Component, EventEmitter, Input, Output } from '@angular/core';

// #docregion
@Component({
  selector: 'my-confirm',
  template: `
    <button (click)="onOkClick()">
      {{okMsg}}
    </button>
    <button (click)="onNotOkClick()">
      {{notOkMsg}}
    </button>
  `
})
export class ConfirmComponent {
  @Input() okMsg: string;
  @Input('cancelMsg') notOkMsg: string;
  @Output() ok =
    new EventEmitter();
  @Output('cancel') notOk =
    new EventEmitter();

  onOkClick() {
    this.ok.next(true);
  }
  onNotOkClick() {
    this.notOk.next(true);
  }
}
// #enddocregion


@Component({
  selector: 'hero-io',
  template: `
    <my-confirm [okMsg]="'OK'"
                [cancelMsg]="'Cancel'"
                (ok)="onOk()"
                (cancel)="onCancel()">
    </my-confirm>
    <span *ngIf="okClicked">OK clicked</span>
    <span *ngIf="cancelClicked">Cancel clicked</span>
  `,
  directives: [ConfirmComponent]
})
export class AppComponent {
  okClicked: boolean;
  cancelClicked: boolean;

  onOk() {
    this.okClicked = true;
  }
  onCancel() {
    this.cancelClicked = true;
  }
}
