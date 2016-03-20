// #docregion
import { Row } from './row';

export class Column {
  cellValue: string;
  row: Row;

  constructor(public columnIndex: number, row: Row) {
    this.cellValue = '';
    this.row = row;
  }
}
