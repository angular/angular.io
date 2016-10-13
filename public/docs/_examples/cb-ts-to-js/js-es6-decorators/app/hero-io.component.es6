import {
  Component,
  EventEmitter,
  Input,
  Output,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
class ConfirmComponent {
  @Input() okMsg;
  @Input('cancelMsg') notOkMsg;
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
  `
})
class AppComponent {
  okClicked;
  cancelClicked;

  onOk() {
    this.okClicked = true;
  }
  onCancel() {
    this.cancelClicked = true;
  }
}


@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    ConfirmComponent
  ],
  bootstrap: [ AppComponent ]
})
export class HeroesIOModule { }
