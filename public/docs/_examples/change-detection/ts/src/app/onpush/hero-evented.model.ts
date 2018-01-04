/*
 * A faux "evented model" class that emulates the kind of patterns
 * used by libraries like Knockout, Backbone, Breeze.
 */
export class HeroModel {
  private changeListeners: (() => void)[] = [];

  constructor(private name: string) { }

  getName() {
    return this.name;
  }

  setName(newName: string) {
    this.name = newName;
    for (let changeListener of this.changeListeners) {
      changeListener();
    }
  }

  subscribeToChanges(listener: () => void) {
    this.changeListeners.push(listener);
    return () => {
      const idx = this.changeListeners.indexOf(listener);
      if (idx >= 0) {
        this.changeListeners.splice(idx, 1);
      }
    };
  }

}
