// #docplaster
// #docregion
// #docregion v1
import { AppModule }   from '@angular/core';
import { FormsModule } from '@angular/forms';

// #enddocregion v1
// #docregion dup-directive
import { HighlightDirective } from './highlight.directive'
// #docregion v1

@AppModule({
  modules: [FormsModule],
// #enddocregion v1
  // trumped by directive w/ same class name in parent AppRootModule
  directives: [HighlightDirective],
// #docregion v1
})
// #enddocregion dup-directive
export class ContactModule { }
// #enddocregion v1
