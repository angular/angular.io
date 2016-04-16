module.exports = function tagDiagnosticsProcessor(parseTagsProcessor) {

  return {
    $runAfter: ['ids-computed'],
    $process: function(docs) {
      
      // Dump all the known tagdefs
      console.log('=== KNOWN TAGDEFS ===');
      console.log(parseTagsProcessor.tagDefinitions.map(function(tagDef) {
        return tagDef.name;
      }));
      
      var tagsFound = {}; 
    
      docs.forEach(function(doc) {
        if (doc.tags) {
          console.log('DOC: ', doc.id);
          doc.tags.tagsByName.keys().forEach(function(tag) {
            tagsFound[tag] = true;
            console.log(' - ' + tag);
          });
        }
      });
      
      console.log('=== TAGS USED ===');
      console.log(Object.keys(tagsFound));      
    }
  };
};