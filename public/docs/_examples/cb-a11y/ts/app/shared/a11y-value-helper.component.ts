import { Component, Input } from '@angular/core';

@Component({
  selector: 'a11y-value-helper',
  templateUrl: './app/shared/a11y-value-helper.component.html',
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
