import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'a11y-fails',
  templateUrl: 'a11y-pass.component.html'
})
export class A11yPassComponent {
  model: any = {};

  hideSuccessConfirmation = true;

  submit(messageElement: any): void {
    this.hideSuccessConfirmation = false;
    setTimeout(() => {
      messageElement.focus();
    }, 200);
  }

}
