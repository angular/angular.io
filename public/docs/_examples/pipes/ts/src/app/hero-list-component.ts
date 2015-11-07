// #docregion
import {bootstrap, Component, 
        CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2'

import {FetchJsonPipe} from './fetch-json-pipe'

@Component({
  selector: 'hero-list',
  template: `
    <h4>Heroes from JSON File</h4>
    
    <div *ng-for="#hero of ('heroes.json' | fetch) ">
      {{hero.name}}
    </div>
    
    <p>Heroes as JSON: 
    {{'heroes.json' | fetch | json}}
    </p>
  `,
  directives:[CORE_DIRECTIVES],
  pipes: [FetchJsonPipe]
})
export class HeroListComponent { 
  /* I've got nothing to do ;-) */ 
}
