// #docregion
import { Component } from '@angular/core';

@Component({
  // Set the base for module-relative URLs
  moduleId: module.id,

  // Declare the tag name in index.html to where the component attaches
  selector: 'hello-world',

  // Location of the template for this component
  templateUrl: './hello_world.html'
})
export class HelloWorldComponent {

  // Declaring the variable for binding with initial value
  yourName: string = '';
}
