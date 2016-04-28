import { Injectable } from 'angular2/core';

export interface ISpinnerState { }

@Injectable()
export class SpinnerService {
  spinnerState: any;

  show() { }

  hide() { }
}
