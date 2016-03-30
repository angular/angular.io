import { Component } from '@angular/core';

@Component({
  selector: 'a11y-fails',
  templateUrl: './app/dev-tools/a11y-fails/a11y-fails.component.html',
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

  hideSuccessConfirmation: boolean = true;

  submit(): void {
    this.hideSuccessConfirmation = false;
  }

}
