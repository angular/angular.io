// #docregion
import { Component, OnInit } from '@angular/core';

import { TreeNode }          from './tree-node';
import { TreeNodeService }   from './tree-node.service';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Hero locations</h2>
      <button (click)="treeNodeService.toggleNodes(nodes,true)">Expand All</button>
      <button (click)="treeNodeService.toggleNodes(nodes,false)">Collapse All</button>
      <tree-view id="heroes" [nodes]="nodes"></tree-view>
    </div>
  `
})
export class AppComponent implements OnInit {
  nodes: TreeNode[] = [];

  constructor(private treeNodeService: TreeNodeService) {
  }

  ngOnInit() {
    this.treeNodeService
        .getTreeNodes()
        .then((nodes: TreeNode[]) => this.nodes = nodes)
        .catch((error: any) => console.log(error)); // TODO: Display error
  }
}
