var _ = require('lodash');

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * @dgProcessor checkUnbalancedBackTicks
 * @description
 * Searches the rendered content for an odd number of (```) backticks,
 * which would indicate an unbalanced pair and potentially a typo in the
 * source content.
 */
module.exports = function checkUnbalancedBackTicks(log, createDocMessage) {

  var BACKTICK_REGEX = /^ *```/gm;
  //  captures below
  //   1st is entire ``` with leading 2 blanks
  //   2nd is the name of the language (if any) specified after the ```
  //   3nd is the contents of the ``` block up until but not including the first non whitespace char after the end ```
  //   4th is the padding of the first nonblank line following the backtick block
  //   5th is the first char on the next line.
  var BACKTICK_CAPTURE = /(  ```(.*$)([^]*?)```\s*)^(\s*)(\S)/m;


  var CODE_EXAMPLE = 'code-example(format="linenums" language="js").';
  return {
    // $runAfter: ['checkAnchorLinksProcessor'],
    $runAfter: ['inlineTagProcessor'],
    $runBefore: ['writeFilesProcessor'],
    $process: function(docs) {
      _.forEach(docs, function(doc) {
        if ( doc.renderedContent ) {
          var matches = doc.renderedContent.match(BACKTICK_REGEX);
          if (matches && matches.length % 2 !== 0) {
            log.warn(createDocMessage('checkUnbalancedBackTicks processor: unbalanced backticks found in rendered content', doc));
            console.log(doc.renderedContent);
          } else if (matches) {
            var captures = BACKTICK_CAPTURE.exec(doc.renderedContent);
            while (captures) {
              var entireBlock = captures[1];
              var language = captures[2];
              var blockContents = captures[3];
              var pad = captures[4];
              if (pad.length >= 2) {
                pad = pad.substr(2);
              }
              var nextBlockStartChar = captures[5];
              var codeExamplePrefix = language.length ? CODE_EXAMPLE.replace('js', language) : CODE_EXAMPLE;
              var replaceVal = codeExamplePrefix + escapeHtml(blockContents) + '\n';
              if (nextBlockStartChar != '.') {
                replaceVal = replaceVal + pad + ':markdown\n';
              }
              doc.renderedContent = doc.renderedContent.replace(entireBlock, replaceVal);
              captures = BACKTICK_CAPTURE.exec(doc.renderedContent);
            }
            var x = 3;
          }
        }
      });
    }
  };
};