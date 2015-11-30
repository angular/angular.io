import {Component, Query, QueryList} from 'angular2/angular2';
import {Hero} from '../hero';
import {HeroCrm} from './hero-crm';
import {HeroPanel} from './hero-panel';

@Component({
  selector: 'hero-panel-manager',
  template: `
    
    <div *ng-if='heroesToManage.length > 0' 
      class='hero-panel-header'>
      <h2>Hero Panel Manager</h2>
      <button (click)='showAll=true'>
        Show all heroes
      </button>
      <button (click)='showAll=false'>
        Show distinguished heroes only
      </button>
    </div>
    <div class='hero-panel-list'>
      <hero-panel
        *ng-for='#hero of heroesToManage'
        [hidden]='!showAll && !hero.distinguished'
        [hero]='hero'>
      </hero-panel>
    </div>
    <content></content>
  `,
  styleUrls: ['app/hero-job-board.css', 'app/hero-panel-manager.css'],
  directives: [HeroPanel]
})
export class HeroPanelManager {
  heroesToManage: QueryList<HeroCrm>;
  showAll = true;
  
  constructor(@Query(HeroCrm) toManage: QueryList<HeroCrm>){
    this.heroesToManage = toManage;
    toManage.changes.subscribe(
      _ => console.log(this.heroesToManage.length)
    );
  }
}