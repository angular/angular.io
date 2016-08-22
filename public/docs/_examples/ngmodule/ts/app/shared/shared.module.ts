// #docregion
import { NgModule,
         ModuleWithProviders } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { AwesomePipe }         from './awesome.pipe';
import { HighlightDirective }  from './highlight.directive';
import { TitleComponent }      from './title.component';
import { UserService }         from './user.service';

// #docregion shared-module
@NgModule({
  imports:      [ CommonModule ],
  declarations: [ AwesomePipe, HighlightDirective, TitleComponent ],
  exports:      [ AwesomePipe, HighlightDirective, TitleComponent,
                  CommonModule, FormsModule ]
})
export class SharedModule {

// #docregion for-root
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ UserService ]
    };
  }
// #enddocregion for-root
}

// #enddocregion shared-module
// #enddocregion

// #docregion shared-root-module
@NgModule({
  exports:   [ SharedModule ],
  providers: [ UserService ]
})
export class SharedRootModule { }
// #enddocregion shared-root-module
