// #docregion
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { AwesomePipe }         from './awesome.pipe';
import { HighlightDirective }  from './highlight.directive';

// #docregion module
@NgModule({
  imports:      [ CommonModule ],
  declarations: [ AwesomePipe, HighlightDirective ],
  exports:      [ AwesomePipe, HighlightDirective,
                  CommonModule, FormsModule ]
})
export class SharedModule { }
// #enddocregion module
// #enddocregion
