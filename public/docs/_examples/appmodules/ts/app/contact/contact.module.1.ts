// #docplaster
// #docregion
// #docregion v1
import { AppModule }   from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ContactService }     from './contact.service';
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
  providers: [ContactService],
})
// #enddocregion dup-directive
export class ContactModule {}
// #enddocregion v1
