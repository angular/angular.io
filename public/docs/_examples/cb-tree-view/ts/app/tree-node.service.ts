// #docregion
import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { TreeNode }   from './tree-node';
import { Hero }       from './hero';

@Injectable()
export class TreeNodeService {
  private root = new TreeNode('Hero Regions', [], []);
  selectedNode: TreeNode;

  constructor(private http: Http) {}

  // #docregion build-tree
  private buildTreeRecursive(root: TreeNode, nodes: any[]): TreeNode {
    if (nodes) {
      nodes.forEach(node => {
        let heroes = (node.heroes || []).map((hero: any) => new Hero(hero.name, hero.ranking));
        let treeNode = new TreeNode(node.title, [], heroes);
        root.nodes.push(this.buildTreeRecursive(treeNode, node.nodes));
        return treeNode;
      });
    }
    return root;
  }

  getTreeNodes(): Promise<TreeNode[]> {
    return this.http.get('./app/mock-data.json')
               .toPromise()
               .then(res => {
                 let root = this.buildTreeRecursive(this.root, res.json().nodes);
                 return root.nodes;
               });
  }
  // #enddocregion build-tree

  addHero(newHero: Hero): void {
    this.selectedNode.heroes.push(newHero);
  }

  // #docregion toggle-nodes
  toggleNodes(nodes: TreeNode[], state: boolean): void {
    nodes.forEach(node => {
      node.expanded = state;
      this.toggleNodes(node.nodes, state);
    });
  }
  // #enddocregion toggle-nodes

  selectNode(node: TreeNode): void {
    if (this.selectedNode) {
      this.selectedNode.unselect();
    }

    this.selectedNode = node;
    this.selectedNode.select();
  }
}
