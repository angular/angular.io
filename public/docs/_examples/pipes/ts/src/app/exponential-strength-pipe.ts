// #docregion
import {Pipe} from 'angular2/angular2';
/* 
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage: 
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/ 
@Pipe({
  name: 'exponentialStrength'
})
export class ExponentialStrengthPipe {
  
  transform(value:number, args:string[]) : any {
    return Math.pow(value, parseInt(args[0] || '1', 10));
  }
}
// #enddocregion