// Useful for spying on an element
// for fun; not used (yet)
import {Directive, ElementRef} from 'angular2/core';

// set the selector for the element type to spy on.
@Directive({selector: 'select'})
export class DecoratorDirective {
  constructor(el: ElementRef){
    console.log(el)
  }
}