import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  activate: (message?: string, title?: string) => Promise<boolean>;
}
