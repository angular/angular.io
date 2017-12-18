// #docregion
import { Component } from '@angular/core';
// #docregion providers
import { ToggleComponent } from './toggle.component';
import { ToggleNgModelDirective } from './toggle-ng-model.directive';

@Component({
  selector: 'cb-app',
  directives: [ ToggleComponent, ToggleNgModelDirective ],
  template: `
    <cb-toggle [value]="isOn" (valueChange)="handleChange($event)"></cb-toggle>
    <cb-toggle [(value)]="isOn"></cb-toggle>
    <cb-toggle [(ngModel)]="isOn"></cb-toggle>

    <form #toggleForm="ngForm">
      <cb-toggle #toggle="ngForm" ngControl="toggle" [(ngModel)]="isOn"></cb-toggle>
      <p>
        <strong>Form is Dirty:</strong> {{ toggleForm.dirty }}<br />
        <strong>Toggle is Dirty:</strong> {{ toggle.dirty }}
      </p>
    </form>
  `
})
// #enddocregion providers
export class AppComponent {
  public isOn = false;

  public handleChange(newValue: boolean): void {
    this.isOn = newValue;
  }
}
