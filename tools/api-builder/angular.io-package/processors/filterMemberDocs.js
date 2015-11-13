module.exports = function filterMemberDocs() {
  return {
    $runAfter: ['extra-docs-added'],
    $runBefore: ['rendering-docs'],
    $process: function(docs) {
      return docs.filter(function(doc) { return doc.docType !== 'member'; });
    }
  }
};