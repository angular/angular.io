///<reference path="./window.extension.d.ts"/>

// #docregion
import {Pipe} from 'angular2/angular2';

// #docregion pipe-metadata
@Pipe({
  name: 'fetch',
  pure: false
})
// #enddocregion pipe-metadata
export class FetchJsonPipe {
  private fetchedValue:any;
  private fetchPromise:Promise<any>;
  transform(value:string, args:string[]):any {
    if (!this.fetchPromise) {
      this.fetchPromise = window.fetch(value)
        .then(result => result.json())
        .then(json => {
          this.fetchedValue = json;
        });
    }

    return this.fetchedValue;
  }
}