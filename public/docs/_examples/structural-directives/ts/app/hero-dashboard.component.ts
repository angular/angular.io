// #docplaster ...
// #docregion
import {Component, Input}    from 'angular2/core';
import {Hero}                from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroStatusPipe}      from './hero-status.pipe';
// #docregion content-child
import {ContentChild, TemplateRef} from 'angular2/core';
// #enddocregion content-child
// #docregion view-children
import {ViewChildren, QueryList} from 'angular2/core';
// #enddocregion view-children

@Component({
  selector: 'hero-dashboard',
  templateUrl: 'app/hero-dashboard.component.html',
  styleUrls: ['app/hero-dashboard.css'],
  pipes: [HeroStatusPipe]
})
// #docregion content-child, view-children
export class HeroDashboardComponent {
  // #enddocregion view-children

  @Input() heroes: Hero[];

  @ContentChild(TemplateRef) heroTmpl: TemplateRef;

  // #enddocregion content-child
  // #docregion view-children
  @ViewChildren(HeroDetailComponent) heroDetails: QueryList<HeroDetailComponent>;

  recallAllHeroes() {
    // call recall on all HeroDetail components
    this.heroDetails.toArray().forEach(hd => hd.recall());
  }
  // #docregion content-child
}
// #enddocregion content-child, view-children
// #enddocregion
