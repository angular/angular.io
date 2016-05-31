// #docregion
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/zip';

import 'rxjs/add/operator/repeat';

const base = 'http://thecatapi.com/api/images/get.php?api_key=MTAx&id=';
const ids = ['2a6', '4jt', '2l3', '4kh'];

// Expected urls PLUS a compromised URL
let Urls = ids
          .map(id => base + id)
          .concat('javascript:alert("Evil in the hearts of men")');

@Injectable()
export class DistantService {

  getUrls() {
    return Observable.zip(
      Observable.from(Urls),
      Observable.interval(10000),
      url => url
    ).repeat();
  }
}
// #enddocregion

/*
YouTube variation
  const base = 'https://www.youtube.com/embed/';

  const ids = [
    'O17OWyx08Cg',
    'iT6EaIwtonY',
    'sioEY4tWmLI',
    'vAb-2d1vcg8'
  ];

*/
