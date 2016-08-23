# decisions needed 

  - 1) do we want to mark up all documents that may show up in documentation with #docregion tags or do we want to isolate all 
runnable examples in their own subdir. 

# todo

  - 1) still need to generate js files from ts files before shredding to extract fragments
  - 2) still need to create watches to update fragment shredder when source tests change
  - 3) still need to create mechanism for overridding fragments. ( '_' prefix in name maybe).

# notes

  - 1) Region syntax for html
  
          <!--#docregion main  -->
      
          <!--#enddocregion -->
  - 2) Region syntax for js/ts
  
        // #docregion main
        
        // #enddocregion

# typescript compiler call    
  tsc --m commonjs --t es5 --emitDecoratorMetadata --experimentalDecorators --sourceMap app.ts    
  