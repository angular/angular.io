// #docregion
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StructuralDirectivesComponent } from './structural-directives.component';
import { UnlessDirective } from './unless.directive';
import { HeavyLoaderComponent } from './heavy-loader.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    StructuralDirectivesComponent,
    UnlessDirective,
    HeavyLoaderComponent
  ],
  bootstrap: [ StructuralDirectivesComponent ]
})
export class AppModule { }
