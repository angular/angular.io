// #docregion
import {Directive, OnInit, OnDestroy} from 'angular2/core';
import {LoggerService}  from './logger.service';

let nextId = 1;

// #docregion spy-directive
// Spy on any element to which it is applied.
// Usage: <div my-spy>...</div>
@Directive({selector: '[my-spy]'})
export class Spy implements OnInit, OnDestroy {

  constructor(private _logger:LoggerService) { }

  ngOnInit()    { this._logIt(`onInit`); }

  ngOnDestroy() { this._logIt(`onDestroy`); }

  private _logIt(msg:string){
    this._logger.log(`Spy #${nextId++} ${msg}`);
  }
}
// #enddocregion spy-directive
