// #docregion
import {Component} from 'angular2/core';
import {HeroJobBoard} from './hero-job-board';
import {Hero} from '../hero';
import {HeroCrm} from './hero-crm';

@Component({
  selector: 'job-board-with-content',
  template: `
    <hero-job-board>
      <hero-crm [id]="17" [name]="'Dynama'"></hero-crm>
      <hero-crm *ngFor="#hero of heroesFromCrm"
        [id]="hero.id"
        [name]="hero.name">
      </hero-crm>
      <hero-crm [id]="19" [name]="'Magma'"></hero-crm>
    </hero-job-board>
  `,
  directives: [HeroJobBoard, HeroCrm]
})
export class JobBoardWithContent {
  heroesFromCrm = Hero.heroes;
}
// #enddocregion