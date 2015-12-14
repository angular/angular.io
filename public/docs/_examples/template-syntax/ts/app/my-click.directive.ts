import {Directive,  Output, ElementRef, EventEmitter} from 'angular2/core';

@Directive({selector:'[mClick]'})
export class MyClickDirective {
  // #docregion myClick-output-1
  @Output('myClick') clicks = new EventEmitter<string>();
 // #enddocregion myClick-output-1
  constructor(el: ElementRef){
    el.nativeElement
      .addEventListener('click', (event:Event) => {
        this.clicks.emit('Click!');
      });
  }
}

// #docregion myClick-output-2
@Directive({
// #enddocregion myClick-output-2
  selector:'[myClick2]',
// #docregion myClick-output-2
  outputs:['clicks:myClick']
})
// #enddocregion myClick-output-2
export class MyClickDirective2 {
  clicks = new EventEmitter<string>();
  constructor(el: ElementRef){
    el.nativeElement
      .addEventListener('click', (event:Event) => {
        this.clicks.emit('Click!');
      });
  }
}