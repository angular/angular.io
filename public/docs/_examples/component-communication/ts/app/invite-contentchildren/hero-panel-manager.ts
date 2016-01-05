import {
    Component, 
    ContentChildren, QueryList, 
    Output, EventEmitter
  } from 'angular2/core';
import {HeroPanel} from './hero-panel';

import {Hero} from '../hero';

@Component({
  selector: 'hero-panel-manager',
  templateUrl: 'app/invite-contentchildren/manager-template.html',
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel]
})
export class HeroPanelManager {
  @ContentChildren(HeroPanel) heroPanels: QueryList<HeroPanel>;
  @Output() remove = new EventEmitter<Hero>();
  
  removeHero(hero: Hero) {
    this.remove.emit(hero);
  }
}