// #docregion
export class RestoreService<T> {
  originalItem: T;
  currentItem: T;

  setItem (item: T) {
    this.originalItem = item;
    this.currentItem = this.clone(item);
  }

  getItem (): T {
    return this.currentItem;
  }

  restoreItem (): T {
    this.currentItem = this.originalItem;
    return this.getItem();
  }

  clone (item: T): T {
    // super poor clone implementation
    return JSON.parse(JSON.stringify(item));
  }
}
// #enddocregion
