// #docregion
import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';

import { AlbumListComponent }    from './album-list.component';
import { MovieListComponent }    from './movie-list.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ AlbumListComponent, MovieListComponent ],
  exports: [ AlbumListComponent, MovieListComponent ]
})
export class BasicExampleModule {
}
