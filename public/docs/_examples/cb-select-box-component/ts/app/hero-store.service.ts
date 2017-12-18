// #docregion
import { Injectable } from '@angular/core';

export interface Hero {
  id: number;
  name: string;
}

@Injectable()
export class HeroStoreService {
  get heroes(): Hero[] { return HeroStoreService.heroCache; }

  static heroCache: Hero[] = [
    {'id': 11, 'name': 'Mr. Nice'},
    {'id': 12, 'name': 'Narco'},
    {'id': 13, 'name': 'Bombasto'},
    {'id': 14, 'name': 'Celeritas'},
    {'id': 15, 'name': 'Magneta'},
    {'id': 16, 'name': 'RubberMan'},
    {'id': 17, 'name': 'Dynama'},
    {'id': 18, 'name': 'Dr IQ'},
    {'id': 19, 'name': 'Magma'},
    {'id': 20, 'name': 'Tornado'}
  ];
}
// #enddocregion
