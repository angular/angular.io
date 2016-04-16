// #docregion
import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { TreeNode }   from './tree-node';
import { Hero }       from './hero';

@Injectable()
export class TreeNodeService {

  private _root = new TreeNode('Hero Regions', [], []);
  selectedNode: TreeNode;

  constructor(private _http: Http) {
  }

  // #docregion build-tree
  private _buildTreeRecursive(root: TreeNode, nodes: Array<any>): TreeNode {
    if (nodes) {
      nodes.forEach(node => {
        let heroes = (node.heroes || []).map((hero: any) => new Hero(hero.name, hero.ranking));
        let treeNode = new TreeNode(node.title, [], heroes);
        root.nodes.push(this._buildTreeRecursive(treeNode, node.nodes));
        return treeNode;
      });
    }
    return root;
  }

  getTreeNodes(): any {
    return this._http.get('./app/mock-data.json')
               .toPromise()
               .then(res => {
                 let root = this._buildTreeRecursive(this._root, res.json().nodes);
                 return root.nodes;
               });
  }
  // #enddocregion build-tree   

  addHero(newHero: Hero) {
    this.selectedNode.heroes.push(newHero);
  }

  // #docregion toggle-nodes
  toggleNodes(nodes: Array<TreeNode>, state: boolean) {
    nodes.forEach(node => {
      node.expanded = state;
      this.toggleNodes(node.nodes, state);
    });
  }
  // #enddocregion toggle-nodes

  selectNode(node: TreeNode) {
    if (this.selectedNode) {
      this.selectedNode.unselect();
    }

    this.selectedNode = node;
    this.selectedNode.select();
  }
}
