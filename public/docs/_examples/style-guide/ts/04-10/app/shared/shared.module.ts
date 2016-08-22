import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FilterTextComponent,
         InitCapsPipe,
         ModalComponent,
         NavComponent,
         SpinnerComponent } from './';

const declarations = [
    FilterTextComponent, InitCapsPipe, ModalComponent,
    NavComponent, SpinnerComponent,
];

@NgModule({
  imports: [ BrowserModule ],
  declarations: declarations,
  exports: declarations
})
export class SharedModule { }
