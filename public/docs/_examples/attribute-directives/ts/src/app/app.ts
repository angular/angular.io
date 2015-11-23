// #docregion
import {bootstrap, Component} from 'angular2/angular2';
import {Highlight} from './highlight.directive'

@Component({
  selector: 'my-app',
  template: `
  <h1>My First Attribute Directive</h1>
  <h4>Pick a highlight color</h4>
  <div>
    <input type="radio" name="colors" (click)="color='cornsilk'" checked>CornSilk
    <input type="radio" name="colors" (click)="color='yellow'">Yellow
    <input type="radio" name="colors" (click)="color='lightcyan'">Cyan
  </div>
  <p [highlight]='color'>Highlight me!</p>
  `,
  directives: [Highlight]
})

class AppComponent {
  color = 'cornsilk';
}

bootstrap(AppComponent);
// #enddocregion