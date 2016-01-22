// #docregion
import {Component} from 'angular2/core';

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'hello-world',

  // Location of the template for this component
  templateUrl: 'app/hello_world.html'
})
export class HelloWorld {

  // Declaring the variable for binding with initial value
  yourName: string = '';
}
