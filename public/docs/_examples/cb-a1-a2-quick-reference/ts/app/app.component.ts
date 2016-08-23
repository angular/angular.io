import { Component } from '@angular/core';

import { MovieService } from './movie.service';
import { IMovie } from './movie';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  providers: [MovieService]
})
export class AppComponent {

  angularDocsUrl = 'https://angular.io/';
  colorPreference = 'red';
  eventType = '<not clicked yet>';
  isActive = true;
  isImportant = true;
  movie: IMovie = null;
  movies: IMovie[] = [];
  showImage = true;
  title: string = 'A1-A2 Quick Ref Cookbook';
  toggleImage(event: UIEvent) {
    this.showImage = !this.showImage;
    this.eventType = (event && event.type) || 'not provided';
  }

  constructor(movieService: MovieService) {
    this.movies = movieService.getMovies();
    this.movie = this.movies[0];
  }
}
