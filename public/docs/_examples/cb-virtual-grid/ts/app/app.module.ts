import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CellComponent } from './cell.component';
import { HeroGridComponent } from './hero-grid.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, CellComponent, HeroGridComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
