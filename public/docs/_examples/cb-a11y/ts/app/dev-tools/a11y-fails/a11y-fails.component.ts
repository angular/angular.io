import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'a11y-fails',
  templateUrl: 'a11y-fails.component.html',
  styles: [
    `
      input {
      font-weight: bold;
      }

      label {
      color: #808080;
      }
     `
  ]
})
export class A11yFailsComponent {
  model: any = {};

  hideSuccessConfirmation = true;

  submit(): void {
    this.hideSuccessConfirmation = false;
  }

}
