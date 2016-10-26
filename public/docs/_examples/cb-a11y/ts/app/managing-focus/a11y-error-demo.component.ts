import { Component } from '@angular/core';

// #docregion
@Component({
  moduleId: module.id,
  selector: 'a11y-error-demo',
  templateUrl: 'a11y-error-demo.component.html'
})
export class A11yErrorDemoComponent {
  hideErrorConfirmation = true;

  setFocusOn(element: any): void {
    this.hideErrorConfirmation = false;
    setTimeout(() => {
      element.focus();
    }, 200);
  }
}
// #enddocregion
