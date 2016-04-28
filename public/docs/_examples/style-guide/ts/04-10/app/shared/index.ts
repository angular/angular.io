// #docregion
// #docregion example
export * from './config';
export * from './entity.service';
export * from './exception.service';
export * from './filter-text';
export * from './init-caps.pipe';
export * from './modal';
export * from './nav';
export * from './spinner';
export * from './toast';
// #enddocregion example

import {EntityService} from './entity.service';
import {ExceptionService} from './exception.service';
import {FilterService} from './filter-text';
import {InitCapsPipe} from './init-caps.pipe';
import {ModalService} from './modal';
import {SpinnerService} from './spinner';
import {ToastService} from './toast';

export const BLOCK_PROVIDERS = [
  EntityService,
  ExceptionService,
  FilterService,
  InitCapsPipe,
  ModalService,
  SpinnerService,
  ToastService
];
