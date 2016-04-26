// #docregion
import { Component } from 'angular2/core';

// #docregion example
@Component({
  selector: 'toh-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls:  ['heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
}
// #enddocregion example
