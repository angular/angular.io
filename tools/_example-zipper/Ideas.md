Summary:
        
        1) if we discover a 'zipconfig.json' file or an 'xxx.zipconfig.json' file with the following structure 

          {
            "zipRegion": "zip",
            "files": [ "foo.js", "**/**/.css", "!xxx.css"]
          }
          
          where "zipRegion" is optional.
          
          Then we zip up all of the files specified, cleaning and removing extra doc tags.  If the specified 'zipRegion' 
          is discovered in any file then we only zip that region. Otherwise we zip the entire file.
          
          