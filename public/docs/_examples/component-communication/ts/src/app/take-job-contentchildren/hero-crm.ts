// #docregion
import {Directive, Input} from 'angular2/angular2';

@Directive({
  selector: 'hero-crm'
})
export class HeroCrm {
  @Input() id: number;
  @Input() name: string;
}
// #enddocregion