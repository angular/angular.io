import {
  OnChanges, SimpleChange,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
} from 'angular2/core';
import {Component, Input, Output} from 'angular2/core';
import {LoggerService}            from './logger.service';

let nextId = 1;

// #docregion ngOnInit
export class PeekABoo implements OnInit {
  constructor(private _logger:LoggerService) { }

  // implement OnInit's `ngOnInit` method
  ngOnInit() { this._logIt(`OnInit`); }

  protected _logIt(msg:string){
    this._logger.log(`#${nextId++} ${msg}`);
  }
}
// #enddocregion ngOnInit

@Component({
  selector: 'peek-a-boo',
  template: '<p>Now you see my hero, {{name}}</p>',
  styles: ['p {background: LightYellow; padding: 8px}']
})
// Don't HAVE to mention the Lifecycle Hook interfaces
// unless we want typing and tool support.
export class PeekABooComponent extends PeekABoo implements
             OnChanges, OnInit, DoCheck,
             AfterContentInit,AfterContentChecked,
             AfterViewInit, AfterViewChecked,
             OnDestroy {
  @Input()  name:string;

  private _verb = 'initialized';

  constructor(logger:LoggerService) {
    super(logger);
    
    let is = this.name ? 'is' : 'is not';
    this._logIt(`name ${is} known at construction`);
  }

  // only called for/if there is an @input variable set by parent.
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    let changesMsgs:string[] = []
    for (let propName in changes) {
      if (propName === 'name') {
        let name = changes['name'].currentValue;
        changesMsgs.push(`name ${this._verb} to "${name}"`);
      } else {
        changesMsgs.push(propName + ' ' + this._verb);
      }
    }
    this._logIt(`OnChanges: ${changesMsgs.join('; ')}`);
    this._verb = 'changed'; // next time it will be a change
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngDoCheck(){ this._logIt(`DoCheck`); }

  ngAfterContentInit(){ this._logIt(`AfterContentInit`);  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterContentChecked(){ this._logIt(`AfterContentChecked`); }

  ngAfterViewInit(){ this._logIt(`AfterViewInit`); }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterViewChecked(){ this._logIt(`AfterViewChecked`); }

  ngOnDestroy() { this._logIt(`OnDestroy`); }
}
