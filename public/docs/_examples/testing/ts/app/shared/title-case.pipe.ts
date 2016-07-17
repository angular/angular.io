// #docregion
import { Pipe, PipeTransform } from '@angular/core';

/*
 * Transform to Title Case: uppercase the first letter of the words in a string.
*/
@Pipe({name: 'titlecase', pure: false})
export class TitlecasePipe implements PipeTransform {
  transform(input: string): string {
    return input.length === 0 ? '' :
      input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));
  }
}
