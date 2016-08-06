// #docplaster
// #docregion
// Import browser platform WITHOUT the runtime compiler.
import { browserPlatform } from '@angular/platform-browser';

// Import bootstrap facility that expects a compiled module factory.
import { bootstrapModuleFactory } from '@angular/core';

// #enddocregion
/*
// #docregion
// Import the module factory produced by the static compiler
import { AppRootModuleNgFactory } from './app-root.module.ngfactory';

// Bootstrap with that factory, targeting the browser.
bootstrapModuleFactory(AppRootModuleNgFactory, browserPlatform());
// #enddocregion
*/
