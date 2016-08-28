// #docregion
import { Injectable }             from '@angular/core';

import { Column }                 from './column';
import { HeroDataService }        from './hero-data.service';
import { HeroGridSortingService } from './hero-grid-sorting.service';
import { KeyCodeService }         from './key-code.service';
import { Row }                    from './row';

@Injectable()
export class HeroGridService {
  static maxRows = 1000;
  header: string[] = ['Name', 'Ranking', 'Age'];
  rows: Row[];
  currentColumn: Column;
  currentRowIndex = 0;

  private gridWindow: any;

  constructor(private keyCodeService: KeyCodeService, private sortingService: HeroGridSortingService, heroDataService: HeroDataService) {
    this.rows = heroDataService.getApplicants(HeroGridService.maxRows);

    this.init();

    let missingRows = this.gridWindow.pageSize - this.rows.length;

    for (let i = 0; i <= missingRows; i++) {
      this.rows.push(new Row(this.header.length));
    }
  }

  selectColumn(col: Column): void {
    this.currentColumn = col;
    this.currentRowIndex = this.rows.indexOf(this.currentColumn.row);
  }

  sort(colIndex: number): void {
    this.sortingService.sort(this.rows, colIndex);
    this.init();
  }

  createCellSelector(row: Row, col: Column): string {
    return 'cell' + this.rows.indexOf(row) + '-' + row.columns.indexOf(col);
  }

  getCurrentCellSelector(): string {
    let cellIndex = this.rows[this.currentRowIndex].columns.indexOf(this.currentColumn);
    return 'cell' + this.currentRowIndex + '-' + cellIndex;
  }

  getVisibleRows(): Row[] {
    let visible: Row[] = [];
    for (let i = this.gridWindow.start; i <= this.gridWindow.end; i++) {
      visible.push(this.rows[i]);
    }
    return visible;
  }

  navigate(keyCode: number): void {
    let navDirection = this.keyCodeService.getNavigationKey(keyCode);

    if (navDirection.down) {
      this.ensureRow();
      this.currentColumn = this.rows[this.currentRowIndex + 1].columns[this.currentColumn.columnIndex];
      this.adjustRowRangeDownward();
    }

    if (navDirection.up) {
      if (this.currentRowIndex > 0) {
        this.currentColumn = this.rows[this.currentRowIndex - 1].columns[this.currentColumn.columnIndex];
        this.adjustRowRangeUpward();
      }
    }

    if (navDirection.left) {
      if (this.currentColumn.columnIndex > 0) {
        this.currentColumn = this.rows[this.currentRowIndex].columns[this.currentColumn.columnIndex - 1];
      }
    }

    if (navDirection.right) {
      if (this.currentColumn.columnIndex < this.header.length - 1) {
        this.currentColumn = this.rows[this.currentRowIndex].columns[this.currentColumn.columnIndex + 1];
      }
    }

    this.currentRowIndex = this.rows.indexOf(this.currentColumn.row);
  }

  private adjustRowRangeUpward(): void {
    if (this.currentRowIndex <= this.gridWindow.start) {
      this.shiftRowsBy(-1);
    }
  }

  private adjustRowRangeDownward(): void {
    if (this.currentRowIndex === this.gridWindow.end) {
      this.shiftRowsBy(1);
    }
  }

  private shiftRowsBy(offset: number): void {
    this.gridWindow.start = this.gridWindow.start + offset;
    this.gridWindow.end = this.gridWindow.end + offset;
  }

  private ensureRow(): void {
    if (this.currentRowIndex + 1 >= this.rows.length) {
      this.rows.push(new Row(this.header.length));
    }
  }

  private init(): void {
    this.gridWindow = {pageSize: 10, start: 0, end: 10};
    this.currentColumn = this.rows[0].columns[0];
    this.currentRowIndex = 0;
  }
}

