// #docregion
import { Component, EventEmitter, Output } from '@angular/core';
import { ListBaseComponent } from './list-base.component';
import { Movie } from '../models';

@Component({
  selector: 'my-movie-list',
  template: `
    <h2>Movies</h2>
    <ul>
      <li *ngFor="let movie of list">
        {{ movie.title }}
        <button (click)="remove(movie)">X</button>
      </li>
    </ul>
  `
})
export class MovieListComponent extends ListBaseComponent<Movie> {
  @Output() movieRemoved = new EventEmitter();

  remove(movie: Movie) {
    super.remove(movie);
    this.movieRemoved.emit(movie);
  }

}
