// #docregion
import {Pipe, PipeTransform} from '@angular/core';
import {Http}                from '@angular/http';

// #docregion pipe-metadata
@Pipe({
  name: 'fetch',
  pure: false
})
// #enddocregion pipe-metadata
export class FetchJsonPipe  implements PipeTransform{
  private fetched:any = null;
  private prevUrl = '';

  constructor(private _http: Http) { }

  transform(url: string): any {
    if (url !== this.prevUrl) {
      this.prevUrl = url;
      this.fetched = null;
      this._http.get(url)
        .map( result => result.json() )
        .subscribe( result => this.fetched = result );
    }

    return this.fetched;
  }
}
