// #docregion
import { Component, Input }  from '@angular/core';

import { AddHeroComponent }  from './add-hero.component';
import { HeroNodeComponent } from './hero-node.component';
import { TreeNode }          from './tree-node';
import { TreeNodeService }   from './tree-node.service';

@Component({
  selector: 'tree-view',

  directives: [TreeViewComponent, // Notice: TreeViewComponent reference inside TreeViewComponent
              AddHeroComponent,
              HeroNodeComponent],

  templateUrl: './app/tree-view.component.html'
})
export class TreeViewComponent {
  @Input() nodes: Array<TreeNode>;

  constructor(private _treeNodeService: TreeNodeService) {
  }

  select(node: TreeNode) {
    this._treeNodeService.selectNode(node);
  }
}
