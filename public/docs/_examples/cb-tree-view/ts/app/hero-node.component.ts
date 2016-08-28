// #docregion
import { Component, Input, OnInit } from '@angular/core';

import { Hero }                     from './hero';

@Component({
  selector: 'hero-node',
  templateUrl: 'app/hero-node.component.html'
})
export class HeroNodeComponent implements OnInit {
  @Input() hero: Hero;
  heroClass: string;

  ngOnInit(): void {
    if (this.hero.ranking > 7) {
      this.heroClass = 'hero-top';
    }else if (this.hero.ranking > 4) {
      this.heroClass = 'hero-ok';
    }else {
      this.heroClass = 'hero-low';
    }
  }
}
