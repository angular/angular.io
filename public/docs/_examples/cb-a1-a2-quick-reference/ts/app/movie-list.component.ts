// #docplaster
// #docregion import
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
// #enddocregion import
import {MovieService} from './movie.service';
import {IMovie} from './movie';
import {StringSafeDatePipe} from './date.pipe';


// #docregion component
@Component({
  selector: 'movie-list',
  templateUrl:'app/movie-list.component.html',
// #enddocregion component
// #docregion style-url
  styleUrls: ['app/movie-list.component.css'],
// #enddocregion style-url
// #docregion date-pipe
  pipes: [StringSafeDatePipe]
// #enddocregion date-pipe
})
// #enddocregion component
// #docregion class
export class MovieListComponent {
// #enddocregion class
  favoriteHero: string;
  showImage: boolean = false;
  movies: IMovie[];

// #docregion di
  constructor(movieService: MovieService) {
// #enddocregion di
    this.movies = movieService.getMovies();
// #docregion di
  }
// #enddocregion di

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  checkMovieHero(value: string): boolean {
    return this.movies.filter(movie => movie.hero === value).length > 0 ;
  }
// #docregion class
}
// #enddocregion class
