// #docregion
import { Component } from '@angular/core';

import { BareHighlightDirective }  from './highlight-bare.directive';
import { SaferHighlightDirective } from './highlight-safer.directive';

@Component({
  selector: 'high-light',
  template: `
  <h3>Highlight Component</h3>
  <p><i>Enter a highlight color and hover over the lines below.</i></p>
  <div>
    <label>
      Color: <input [(ngModel)]="color">
    </label> (e.g., lightgreen, gold, skyblue, #abcdef)
  </div>
  <p [bareHighlight]="color">I'm colored by the bare highlight directive.</p>
  <p [saferHighlight]="color">I'm colored by the safer highlight directive.</p>
  `,
  directives: [
    BareHighlightDirective,
    SaferHighlightDirective
  ]
})

export class HighlightComponent {
  color = 'lightgreen';
}

