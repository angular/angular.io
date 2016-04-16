// #docregion
import { Hero } from './hero';

export class TreeNode {

  expanded: boolean = false;
  selected: boolean = false;

  constructor(public title: string, public nodes?: Array<TreeNode>, public heroes?: Array<Hero>) {
  }

  getIcon() {
    if (this._hasChildren()) {
      if (this.expanded) {
        return '-';
      }
      return '+';
    }
    return '';
  }

  toggle() {
    this.expanded = !this.expanded;
    if (this.expanded === false) {
      this.selected = false;
    }
  }

  select() {
    this.selected = true;
    this.expanded = true;
  }

  unselect() {
    this.selected = false;
  }

  private _hasChildren() {
    return (this.nodes.length + this.heroes.length) > 0;
  }
}
