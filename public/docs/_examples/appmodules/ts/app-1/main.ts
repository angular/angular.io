// #docregion
// Import browser platform WITH the runtime compiler.
import { browserDynamicPlatform } from '@angular/platform-browser-dynamic';

// Import bootstrap facility that expects uncompiled module.
import { bootstrapModule } from '@angular/core';

// Import the application module to be compiled and run.
import { AppRootModule } from './app-root.module';

// Compiles the module (asynchronously) with the runtime compiler
// which generates a compiled module factory in memory.
// Then bootstrap with that factory, targeting the browser.
bootstrapModule(AppRootModule, browserDynamicPlatform());
