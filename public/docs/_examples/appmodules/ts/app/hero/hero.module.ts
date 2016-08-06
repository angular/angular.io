import { AppModule }         from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { FormsModule }       from '@angular/forms';
import { provideRoutes,
         ROUTER_DIRECTIVES } from '@angular/router';
import { HeroComponent }     from './hero.component';
import { HeroList }          from './hero-list.component';
import { HeroDetail }        from './hero-detail.component';
import { HeroService }       from './hero.service';

import { HighlightDirective } from './highlight.directive';

@AppModule({
  directives: [HighlightDirective, ROUTER_DIRECTIVES],
  modules: [BrowserModule, FormsModule],
  providers: [
    HeroService,
    provideRoutes([
      {path: '',
      component: HeroComponent,
      children: [
          { path: '',    component: HeroList },
          { path: ':id', component: HeroDetail }
      ]
    }])
  ]
})
export default class HeroModule {
  constructor(heroService: HeroService) { }
}
