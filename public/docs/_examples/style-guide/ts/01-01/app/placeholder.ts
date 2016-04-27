// #docplaster

// #docregion 01-01-1
  /* avoid */
  import { bootstrap } from '@angular/platform-browser-dynamic';
  import { Component, OnInit } from '@angular/core';

  @Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <pre>{{heroes | json}}</pre>
      `,
    styleUrls: ['app/app.component.css']
  })
  export class AppComponent implements OnInit{
    title = 'Tour of Heroes';

    heroes: Hero[] = [];

    ngOnInit() {
      getHeroes().then(heroes => this.heroes = heroes);
    }
  }

  bootstrap(AppComponent, []);

  function getHeroes() {
    return // some promise of data;
  }
// #enddocregion 01-01-1


// #docregion 01-01-2
  /* recommended */

  // main.ts
  import { bootstrap } from '@angular/platform-browser-dynamic';
  import { AppComponent } from './app.component';

  bootstrap(AppComponent, []);
  /* recommended */

  // app.component.ts
  import { Component, OnInit } from '@angular/core';

  import { Hero } from './hero';
  import { HeroService } from './hero.service';

  @Component({
    selector: 'my-app',
    template: `
        <pre>{{heroes | json}}</pre>
      `,
    styleUrls: ['app/app.component.css'],
    providers: [HeroService]
  })
  export class AppComponent implements OnInit{
    heroes: Hero[] = [];

    constructor(private heroService: HeroService) {}

    ngOnInit() {
      this.heroService.getHeroes()
        .then(heroes => this.heroes = heroes);
    }
  }
// #enddocregion 01-01-2

// #docregion 01-01-3
  /* recommended */

  // hero.service.ts
  import { Injectable } from '@angular/core';
  import { HEROES } from './mock-heroes';

  @Injectable()
  export class HeroService {
    getHeroes() {
      return Promise.resolve(HEROES);
    }
  }
// #enddocregion 01-01-3

// #docregion 01-01-4
  /* recommended */

  // hero.ts
  export class Hero {
    id: number;
    name: string;
  }
// #enddocregion 01-01-4
