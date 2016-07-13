import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { HeroComponent }      from './hero.component.3';
import { HeroDetailComponent }         from './hero-detail.component';
import { HeroListComponent }           from './hero-list.component';
import { HighlightDirective } from './highlight.directive';
import { routing }            from './hero.routing.3';

// #docregion class
@NgModule({
  imports: [ CommonModule, FormsModule, routing ],
  declarations: [
    HeroComponent, HeroDetailComponent, HeroListComponent,
    HighlightDirective
  ]
})
export default class HeroModule { }
// #enddocregion class
