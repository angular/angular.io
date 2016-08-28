import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SimpleSelectComponent } from './simple-select.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, SimpleSelectComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
