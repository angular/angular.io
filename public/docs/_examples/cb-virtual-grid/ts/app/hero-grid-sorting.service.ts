// #docregion
import { Injectable }      from '@angular/core';

import { Row }             from './row';

@Injectable()
export class HeroGridSortingService {
  sortDirection = 1;

  sort(rows: Array<Row>, colIndex: number): void {
    this.sortDirection *= -1;
    rows.sort((a, b) => {
       if (a.columns[colIndex].cellValue === b.columns[colIndex].cellValue) {
         return 0;
       }

       if (a.columns[colIndex].cellValue > b.columns[colIndex].cellValue) {
         return -1 * this.sortDirection;
       }

       if (a.columns[colIndex].cellValue < b.columns[colIndex].cellValue) {
         return 1 * this.sortDirection;
       }
    });
  }
}
