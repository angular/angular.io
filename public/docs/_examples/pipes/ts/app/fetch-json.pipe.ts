/// <reference path='./window.extension.d.ts'/>
// #docregion
import {Pipe, PipeTransform} from 'angular2/core';

// #docregion pipe-metadata
@Pipe({
  name: 'fetch',
  pure: false
})
// #enddocregion pipe-metadata
export class FetchJsonPipe  implements PipeTransform{
  private fetchedValue:any;
  private fetchPromise:Promise<any>;

  transform(value:string, args:string[]):any {
    if (!this.fetchPromise) {
      this.fetchPromise = window.fetch(value)
        .then((result:any) => result.json())
        .then((json:any)   => this.fetchedValue = json);
    }

    return this.fetchedValue;
  }
}