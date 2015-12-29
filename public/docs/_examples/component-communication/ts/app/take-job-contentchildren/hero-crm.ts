// #docregion
import {Directive, Input} from 'angular2/core';

@Directive({
  selector: 'hero-crm'
})
export class HeroCrm {
  @Input() id: number;
  @Input() name: string;
}
// #enddocregion