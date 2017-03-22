// #docregion
import { Injectable } from '@angular/core';

@Injectable()
export class LibService {
  constructor() { }
  getMeaning() { return 42; }
}
