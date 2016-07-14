import { Injectable } from '@angular/core';

@Injectable()
export class ValueService {
  getValues() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
}
