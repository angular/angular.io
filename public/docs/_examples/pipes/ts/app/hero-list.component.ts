// #docregion
import { Component } from '@angular/core';

import { FetchJsonPipe } from './fetch-json.pipe';

@Component({
  selector: 'hero-list',
  // #docregion template
  template: `
    <h2>Heroes from JSON File</h2>

    <div *ngFor="let hero of ('heroes.json' | fetch) ">
      {{hero.name}}
    </div>

    <p>Heroes as JSON:
    {{'heroes.json' | fetch | json}}
    </p>
  `,
  // #enddocregion template
  pipes: [FetchJsonPipe]
})
export class HeroListComponent { }
