import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Inheritance examples</h1>

    <h2>Basic abstract superclass, subclasses with inherited @Input()</h2>
    <my-basic-example></my-basic-example>

    <h2>Redefining Class Metadata</h2>
    <my-class-metadata-example></my-class-metadata-example>

    <h2>Property And Method Inheritance, incl. Lifecycle Methods and Constructors</h2>
    <my-property-metadata-example></my-property-metadata-example>
  `
})
export class AppComponent {
}
