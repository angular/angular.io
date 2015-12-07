import {Directive,  Output, ElementRef, EventEmitter} from 'angular2/core';

@Directive({selector:'[my-click]'})
export class MyClickDirective {
  // #docregion my-click-output-1
  @Output('myClick') clicks = new EventEmitter<string>();
 // #enddocregion my-click-output-1
  constructor(el: ElementRef){
    el.nativeElement
      .addEventListener('click', (event:Event) => {
        this.clicks.emit('Click!');
      });
  }
}

// #docregion my-click-output-2
@Directive({
// #enddocregion my-click-output-2
  selector:'[my-click2]',
// #docregion my-click-output-2
  outputs:['clicks:myClick']
})
// #enddocregion my-click-output-2
export class MyClickDirective2 {
  clicks = new EventEmitter<string>();
  constructor(el: ElementRef){
    el.nativeElement
      .addEventListener('click', (event:Event) => {
        this.clicks.emit('Click!');
      });
  }
}