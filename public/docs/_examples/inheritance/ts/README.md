# Angular Inheritance Sample (draft)

The AOT Cookbook sample was the starting point.  
This sample runs in both JIT and AOT

With AOT you have to re-build after each change.
With JIT you can develop on the fly as we usually do.

## Inheritance experiments
Look at `sub.component.ts` to see the experiments in metadata inheritance.


## Building it

The original source is in https://github.com/angular/angular.io/pull/3096 along with 
tools and configs to build it in JIT and AOT.
You'll need knowledge of the Angular docs sample development practices to do it.

Commands to run:

```
# compile with AOT, then rollup. Noisy.
npm run build:aot

# start server and JIT/TS watching as usual
npm start
```
The browser displays the JIT version (`index.html`) by default.
You can tell by looking at the browser tab (it says "JIT:..."), in the console, and in the page header.

To see the AOT version, put `index-aot.html` in the address bar.
You can tell by looking at the browser tab (it says "AOT:..."), in the console, and in the page header.

## Running it

I like to have two console windows open:

1. Running `npm start` (after once having run `npm run build:aot`)

1. Where I periodically re-run either `npm run tsc` or `npm run build:aot` after a change that works in JIT
