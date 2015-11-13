module.exports = function addNotYetDocumentedProperty(EXPORT_DOC_TYPES, log, createDocMessage) {
  return {
    $runAfter: ['tags-parsed'],
    $runBefore: ['rendering-docs'],
    $process: function(docs) {
      docs.forEach(function(doc) {

        if (EXPORT_DOC_TYPES.indexOf(doc.docType) === -1) return;

        // NotYetDocumented means that no top level comments and no member level comments
        doc.notYetDocumented = doc.description.trim().length == 0;

        if (doc.constructorDoc) {
          doc.constructorDoc.notYetDocumented = doc.constructorDoc.description.trim().length == 0;
          doc.notYetDocumented = doc.notYetDocumented && doc.constructorDoc.notYetDocumented;
        }

        if (doc.members) {
          doc.members.forEach(function(member) {
            member.notYetDocumented = member.description.trim().length == 0;
            doc.notYetDocumented = doc.notYetDocumented && member.notYetDocumented;
          });
        }

        if (doc.notYetDocumented) {
          log.warn(createDocMessage("Not yet documented", doc));
        }
      });

      return docs;
    }
  };
};