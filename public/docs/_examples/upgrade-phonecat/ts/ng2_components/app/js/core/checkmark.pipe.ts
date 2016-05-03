// #docregion
import { Pipe } from '@angular/core';

@Pipe({name: 'checkmark'})
export class CheckmarkPipe {
  transform(input:string): string {
    return input ? '\u2713' : '\u2718';
  }
}
