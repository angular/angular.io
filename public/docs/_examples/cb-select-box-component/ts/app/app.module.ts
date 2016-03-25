import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SelectVerboseComponent } from './select-verbose.component';
import { SelectorHostComponent } from './selector-host.component';
import { SelectorComponent } from './selector.component';
import { HeroStoreService } from './hero-store.service';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    SelectVerboseComponent,
    SelectorHostComponent,
    SelectorComponent
  ],
  providers: [ HeroStoreService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
