// #docregion
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppComponent }  from './app.component';
import { MovieListComponent } from './movie-list.component';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {})
  ],
  declarations: [
    AppComponent,
    MovieListComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
