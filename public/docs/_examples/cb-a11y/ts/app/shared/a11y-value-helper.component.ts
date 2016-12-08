import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'a11y-value-helper',
  templateUrl: 'a11y-value-helper.component.html',
  styles: [`
    .value-label {
      position:relative;
      top: -15px;
    }
`]
})
export class A11yValueHelperComponent {
  @Input() displayValue: any;

}
