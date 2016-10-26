import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'a11y-component-roles',
  templateUrl: 'a11y-component-roles.component.html',
})
export class A11yComponentRolesComponent {
  inputDivModel = '';
  buttonClicks = 0;

  onClick(): void {
    this.buttonClicks++;
  }

  generateButtonString(): string {
    return `Button has been clicked ${this.buttonClicks} times`;
  }

}
