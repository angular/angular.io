import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { HighlightDirective } from './highlight.directive';
import { TitlecasePipe }      from './title-case.pipe';

@NgModule({
  exports:      [ CommonModule, FormsModule,
                  HighlightDirective, TitlecasePipe ],
  declarations: [ HighlightDirective, TitlecasePipe ]
})
export class SharedModule { }
