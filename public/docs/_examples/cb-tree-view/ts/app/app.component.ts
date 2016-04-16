// #docregion
import { Component, OnInit } from '@angular/core';

import { TreeViewComponent } from './tree-view.component';
import { TreeNode }          from './tree-node';
import { TreeNodeService }   from './tree-node.service';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Hero locations</h2>
      <button (click)="_treeNodeService.toggleNodes(_nodes,true)">Expand All</button>
      <button (click)="_treeNodeService.toggleNodes(_nodes,false)">Collapse All</button>
      <tree-view id="heroes" [nodes]="_nodes"></tree-view>
    </div>
  `,
  directives: [TreeViewComponent],
  providers:  [TreeNodeService]
})
export class AppComponent implements OnInit {

  private _nodes: Array<TreeNode> = [];

  constructor(private _treeNodeService: TreeNodeService) {
  }

  ngOnInit() {
    this._treeNodeService
        .getTreeNodes()
        .then((nodes: Array<TreeNode>) => this._nodes = nodes)
        .catch((error: any) => console.log(error)); // TODO: Display error
  }
}
