import { Component } from '@angular/core';
import { A11yCustomControlComponent } from '../shared/a11y-custom-control.component';
import { A11yValueHelperComponent } from '../shared/a11y-value-helper.component';
import { A11yCustomButtonComponent } from '../shared/a11y-custom-button.component';

@Component({
  selector: 'a11y-component-roles',
  templateUrl: './app/component-roles/a11y-component-roles.component.html',
  directives: [
    A11yCustomControlComponent,
    A11yValueHelperComponent,
    A11yCustomButtonComponent
  ]
})
export class A11yComponentRolesComponent {

  inputDivModel: string = '';
  buttonClicks: number = 0;

  onClick(): void {
    this.buttonClicks++;
  }

  generateButtonString(): string {
    return `Button has been clicked ${this.buttonClicks} times`;
  }

}
