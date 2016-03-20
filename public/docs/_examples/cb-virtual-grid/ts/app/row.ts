// #docregion
import { Column } from './column';

export class Row {

  columns: Array<Column>;

  constructor(public columnCount: number) {
    this.columns = [];

    for (let j = 0; j < this.columnCount; j++) {
      this.columns.push(new Column(j, this));
    }
  }
}
