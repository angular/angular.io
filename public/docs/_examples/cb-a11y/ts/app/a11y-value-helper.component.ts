import {Component, Input} from "angular2/core";

@Component({
  selector: 'a11y-value-helper',
  templateUrl: './app/a11y-value-helper.component.html',
  styles: [`
    .value-label {
      position:relative;
      top: -15px;
    }
`]
})
export class A11yValueHelper {

  @Input()
  displayValue: any;

}
