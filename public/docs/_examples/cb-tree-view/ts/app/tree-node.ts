// #docregion
import { Hero } from './hero';

export class TreeNode {

  expanded: boolean = false;
  selected: boolean = false;

  constructor(public title: string, public nodes?: TreeNode[], public heroes?: Hero[]) {
  }

  getIcon(): string {
    if (this.hasChildren()) {
      if (this.expanded) {
        return '-';
      }
      return '+';
    }
    return '';
  }

  toggle(): void {
    this.expanded = !this.expanded;
    if (this.expanded === false) {
      this.selected = false;
    }
  }

  select(): void {
    this.selected = true;
    this.expanded = true;
  }

  unselect(): void {
    this.selected = false;
  }

  private hasChildren() {
    return (this.nodes.length + this.heroes.length) > 0;
  }
}
