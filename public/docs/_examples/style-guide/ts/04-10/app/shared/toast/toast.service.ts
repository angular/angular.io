import { Injectable } from 'angular2/core';

@Injectable()
export class ToastService {
  activate: (message?: string, title?: string) => void;
}
