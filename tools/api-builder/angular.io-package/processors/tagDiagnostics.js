module.exports = function tagDiagnosticsProcessor(parseTagsProcessor, inlineTagProcessor) {

var INLINE_TAG = /(\{@[^\s\}]+[^\}]*\})/;
                        //  11111111     22222222
var INLINE_TAG_DETAIL = /\{@([^\s]+)\s*([^\}]*)\}/;

  return {
    $runAfter: ['ids-computed', 'docs-rendered'],
    $runBefore: ['inlineTagProcessor'],
    $process: function(docs) {
      
      // Dump all the known tagdefs
      console.log('=== KNOWN TAGDEFS ===');
      console.log(parseTagsProcessor.tagDefinitions.map(function(tagDef) {
        return tagDef.name;
      }));
      console.log('=== KNOWN INLINE TAGDEFS ===');
      console.log(inlineTagProcessor.inlineTagDefinitions.map(function(tagDef) {
        return tagDef.name;
      }));
      
      var tagsFound = {}; 
      var inlineTagsFound = {};
    
      docs.forEach(function(doc) {
        if (doc.tags) {
          console.log('DOC TAGS: (', doc.id, ')');
          doc.tags.tagsByName.keys().forEach(function(tag) {
            tagsFound[tag] = true;
            console.log(' - ' + tag);
          });
        }
        
        if (doc.renderedContent) {
          console.log('DOC INLINE TAGS: (', doc.id, ')');
          var parts = doc.renderedContent.split(INLINE_TAG);
          parts.forEach(function(part) {
            var match = INLINE_TAG_DETAIL.exec(part);            
            if (match) {
              var tagName = match[1];
              inlineTagsFound[tagName] = true;
              console.log(' - ' + tagName);
            }
          });
        }
      });
      
      console.log('=== TAGS USED ===');
      console.log(Object.keys(tagsFound));      
      console.log('=== INLINE TAGS USED ===');
      console.log(Object.keys(inlineTagsFound));      
    }
  };
};