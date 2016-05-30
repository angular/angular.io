// #docregion
// Import the native Angular services.
import { Component } from '@angular/core';

// #docregion component
@Component({
  selector: 'cb-app',
  template:
  `
    <input
      (keydown.Enter)='handleKey( "Enter" )'
      (keydown.Meta.Enter)='handleKey( "Meta+Enter" )'
      (keydown.Shift.Enter)='handleKey( "Shift+Enter" )'
      (keydown.Control.Enter)='handleKey( "Control+Enter" )'
      (keydown.Alt.Enter)='handleKey( "Alt+Enter" )'
      (keydown.Alt.Meta.Enter)='handleKey( "Alt+Meta+Enter" )'
      (keydown.Shift.Meta.Enter)='handleKey( "Shift+Meta+Alt+Enter" )'
      (keydown.Alt.Shift.Meta.Enter)='handleKey( "Alt+Shift+Meta+Alt+Enter" )'
      (keydown.Control.Alt.Shift.Meta.Enter)='handleKey( "Control+Alt+Shift+Meta+Alt+Enter" )'
      (keydown.Shift)='handleKey( "Shift" )'
      
      (keydown.a)='handleKey( "a" )'
      (keydown.Shift.a)='handleKey( "A" )'
      (keydown.Shift.?)='handleKey( "?" )'
      (keydown.Tab)='handleKey( "Tab :: CANCELED", $event )'
      (keydown.Space)='handleKey( "Space" )'
      (keydown.Dot)='handleKey( "Dot" )'
      
      (keydown.ArrowLeft)='handleKey( "ArrowLeft" )'
      (keydown.ArrowUp)='handleKey( "ArrowUp" )'
      (keydown.ArrowRight)='handleKey( "ArrowRight" )'
      (keydown.ArrowDown)='handleKey( "ArrowDown" )'
      (keydown.ArrowDown)='handleKey( "ArrowDown" )'
      (keydown.End)='handleKey( "End" )'
      (keydown.Home)='handleKey( "Home" )'
      (keydown.PageDown)='handleKey( "PageDown" )'
      (keydown.PageUp)='handleKey( "PageUp" )'

      (keydown.Meta.s)='handleKey( "Meta+S (Save) :: CANCELED", $event )'
      (keydown.Meta.o)='handleKey( "Meta+O (Open) :: CANCELED", $event )'
      (keydown.Meta.p)='handleKey( "Meta+P (Print) :: CANCELED", $event )'
      (keydown.Meta.f)='handleKey( "Meta+F (Find) :: CANCELED", $event )'

      (keydown.Escape)='handleKey( "Escape" )'
      autofocus>

    <ul>
      <li *ngFor='let item of logItems'>
        Key event: {{ item }}
      </li>
    </ul>
  `
})
export class AppComponent {

  public logItems: string[];
 
  constructor() {
    this.logItems = [];
  }

  public handleKey( description: string, event?: KeyboardEvent ) : void {
    // If the user pressed the ESC key, clear the log.
    if ( description === 'Escape' ) {
      this.logItems = [];
    }
    
    this.logItems.push( description );

    // If the event object is present, prevent the default behavior of the key press.
    event && event.preventDefault();
  }

}
// #enddocregion component