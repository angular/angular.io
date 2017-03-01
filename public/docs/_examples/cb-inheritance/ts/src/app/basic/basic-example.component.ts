import { Component } from '@angular/core';
import { Movie, Album } from '../models';

@Component({
  selector: 'my-basic-example',
  template: `
    <h1>Media Library</h1>
    <my-movie-list [list]="movies">
    </my-movie-list>
    <my-album-list [list]="albums" genre="Classic Rock">
    </my-album-list>
  `
})
export class BasicExampleComponent {
  movies: Movie[] = [
    {title: 'Avengers'},
    {title: 'X-Men'}
  ];
  albums: Album[] = [
    {artist: 'Fleetwood Mac', title: 'Rumours'},
    {artist: 'The Beatles', title: 'Abbey Road'}
  ];
}
