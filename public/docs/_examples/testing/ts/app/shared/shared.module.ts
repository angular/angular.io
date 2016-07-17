import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { TitlecasePipe } from './title-case.pipe';

@NgModule({
  exports:      [ CommonModule, FormsModule,
                  TitlecasePipe ],
  declarations: [ TitlecasePipe ]
})
export class SharedModule { }
