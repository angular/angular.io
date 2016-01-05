import {
    Component, 
    ContentChildren, QueryList, 
    Output, EventEmitter
  } from 'angular2/core';
import {HeroPanel} from './hero-panel';

import {Hero} from '../hero';

@Component({
  selector: 'hero-panel-manager',
  templateUrl: 'app/take-job-contentchildren/manager-template.html',
  styleUrls: ['app/hero-job-board.css'],
  directives: [HeroPanel]
})
export class HeroPanelManager {
  @ContentChildren(HeroPanel) heroPanels: QueryList<HeroPanel>;
  @Output() remove = new EventEmitter<Hero>();
  
  isAwarded(panel: HeroPanel) {
    return panel.hero.id >= 1000;
  }
  
  removeHero(panel: HeroPanel) {
    panel.undertaken = false;
    this.remove.emit(panel.hero);
  }
  
  ngAfterContentInit() {
    this.heroPanels.changes.subscribe(_ => {
      this.logHeroPanels();
    });
    this.logHeroPanels();
  }
  
  logHeroPanels(){
    console.log(`#of heroes managed: ${this.heroPanels.length}`)
  }
}