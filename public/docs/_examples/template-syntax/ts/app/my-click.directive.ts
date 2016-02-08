// #docplaster
import {Directive,  Output, ElementRef, EventEmitter} from 'angular2/core';

@Directive({selector:'[myClick]'})
export class MyClickDirective {
  // #docregion my-click-output-1
  @Output('myClick') clicks = new EventEmitter<string>(); //  @Output(alias) propertyName = ...
 // #enddocregion my-click-output-1
 
  constructor(el: ElementRef){
    el.nativeElement
      .addEventListener('click', (event:Event) => {
        this._toggle = !this._toggle;
        this.clicks.emit(this._toggle ? 'Click!' : '');
      });
  }
  _toggle = false;
}

// #docregion my-click-output-2
@Directive({
// #enddocregion my-click-output-2
  selector:'[myClick2]',
// #docregion my-click-output-2
  outputs:['clicks:myClick']  // propertyName:alias
})
// #enddocregion my-click-output-2
export class MyClickDirective2 {
  clicks = new EventEmitter<string>();
  
  constructor(el: ElementRef){
    el.nativeElement
      .addEventListener('click', (event:Event) => {
        this._toggle = !this._toggle;
        this.clicks.emit(this._toggle ? 'Click2!' : '');
      });
  }
  _toggle = false;  
}