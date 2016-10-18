// #docplaster
// #docregion
import { Component }         from '@angular/core';

// #docregion import-rxjs
// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';
// #enddocregion import-rxjs

import { HeroListComponent }        from './toh/hero-list.component';
import { HeroListPromiseComponent } from './toh/hero-list.component.promise';

import { WikiComponent }      from './wiki/wiki.component';
import { WikiSmartComponent } from './wiki/wiki-smart.component';

@Component({
  selector: 'my-app',
  template: `
    <hero-list></hero-list>
    <hero-list-promise></hero-list-promise>
    <my-wiki></my-wiki>
    <my-wiki-smart></my-wiki-smart>
  `,
// #enddocregion
/*
// #docregion http-providers
  providers: [ HTTP_PROVIDERS ]
// #enddocregion http-providers
*/
// #docregion
  directives: [
    HeroListComponent, HeroListPromiseComponent,
    WikiComponent, WikiSmartComponent
  ]
})
export class AppComponent { }
// #enddocregion
