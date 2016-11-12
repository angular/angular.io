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
  moduleId: module.id,
  selector: 'my-confirm',
  templateUrl: 'confirm.component.html'
})
class ConfirmComponent {
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
  `
})
class AppComponent {
  okClicked: boolean;
  cancelClicked: boolean;

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
