// #docregion
import {Component, Input} from 'angular2/angular2';
import {Hero}             from './hero';

@Component({
  selector: 'hero-detail',
  template: `
    <div>
      <span class="badge">{{hero.id}}</span>
      {{hero.name}}
      <span *ng-if="recalled" class="alert">(recalled)</span>
    </div>
  `,
  styleUrls: ['app/hero-detail.css']
})
// #docregion recall
export class HeroDetailComponent {
// #enddocregion recall
  @Input() hero: Hero;

  recalled = false;
  // #docregion recall
  recall() {
    this.recalled =
      this.hero.status === 'travelling' ||
      this.hero.status === 'engaged';
  }
}
// #enddocregion recall
