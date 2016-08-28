// #docregion
import { Component, OnInit } from '@angular/core';

import { TreeNodeService }   from './tree-node.service';
import { Hero }              from './hero';

@Component({
    selector: 'add-hero',
    templateUrl: 'app/add-hero.component.html'
})
export class AddHeroComponent implements OnInit {
  hero: Hero;

  constructor(private treeNodeService: TreeNodeService) { }

  addHero(): void {
    if (this.hero.name) {
      this.treeNodeService.addHero(this.hero);
      this.hero = new Hero();
    }
  }

  cancel(): void {
    this.treeNodeService.selectedNode.unselect();
  }

  ngOnInit(): void {
    this.hero = new Hero();
  }
}
