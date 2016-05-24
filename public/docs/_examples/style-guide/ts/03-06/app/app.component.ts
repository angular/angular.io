import { Component, OnInit } from '@angular/core';

import { Hero, HeroService } from './+heroes';
import { ExceptionService, SpinnerService, ToastService } from './shared';

@Component({
  moduleId: module.id,
  selector: 'sg-app',
  templateUrl: 'app.component.html',
  providers: [HeroService, ExceptionService, SpinnerService, ToastService]
})
export class AppComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
