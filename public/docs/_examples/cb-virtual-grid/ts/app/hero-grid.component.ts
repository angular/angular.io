// #docregion
import { Component, AfterViewChecked, ViewChildren, QueryList } from '@angular/core';

import { CellComponent }          from './cell.component';
import { HeroGridSortingService } from './hero-grid-sorting.service';
import { HeroGridService }        from './hero-grid.service';
import { KeyCodeService }         from './key-code.service';
import { HeroDataService }        from './hero-data.service';
import { Row }                    from './row';

@Component({
  selector: 'hero-grid',
  directives: [CellComponent],
  providers: [HeroGridService, KeyCodeService, HeroDataService, HeroGridSortingService],
  template: `<h1>Hero Grid</h1>
            <table id="hero-grid">
              <tr>
                <td class="row-number-column"></td>
                <td (click)="sort(colIndex)" class="columnHeader" 
                    *ngFor="let columnHeader of heroGridService.header; let colIndex = index">
                  {{columnHeader}}
                </td>
              </tr>
              <tr *ngFor="let row of visibleRows">
                <td class="row-number-column">
                  {{heroGridService.rows.indexOf(row)}}
                </td>
                <td *ngFor="let col of row.columns">
                  <grid-cell [id]="heroGridService.createCellSelector(row, col)" 
                        [col]="col" 
                        (navigate)="navigate($event)">
                  </grid-cell>       
                </td>
              </tr>
            </table>`
})

export class HeroGridComponent implements AfterViewChecked {

  visibleRows: Array<Row> = [];
  heroGridService: HeroGridService;
  @ViewChildren(CellComponent) cells: QueryList<CellComponent>;

  constructor(heroGridService: HeroGridService) {
    this.heroGridService = heroGridService;
    this.visibleRows = this.heroGridService.getVisibleRows();
  }

  navigate($event: any) {
    this.heroGridService.navigate($event.keyCode);
    this.visibleRows = this.heroGridService.getVisibleRows();
  }

  sort(columnIndex: number) {
    this.heroGridService.sort(columnIndex);
    this.visibleRows = this.heroGridService.getVisibleRows();
  }

  ngAfterViewChecked() {
    let id = this.heroGridService.getCurrentCellSelector();
    let currentCell = this.cells.toArray().find(cell => cell.id === id);
    currentCell.select();
  }
}
