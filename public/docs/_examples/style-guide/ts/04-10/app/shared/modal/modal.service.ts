import { Injectable } from 'angular2/core';

@Injectable()
export class ModalService {
  activate: (message?: string, title?: string) => Promise<boolean>;
}
