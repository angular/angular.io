// #docregion
import { Component, Input }  from '@angular/core';

import { TreeNode }          from './tree-node';
import { TreeNodeService }   from './tree-node.service';

@Component({
  selector: 'tree-view',
  templateUrl: './app/tree-view.component.html'
})
export class TreeViewComponent {
  @Input() nodes: Array<TreeNode>;

  constructor(private treeNodeService: TreeNodeService) {}

  select(node: TreeNode): void {
    this.treeNodeService.selectNode(node);
  }
}
