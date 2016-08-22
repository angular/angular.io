var _ = require('lodash');

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


//  captures below
//   1st is entire ``` including leading whitespace
//   2nd is the leading whitespace on the line before the ``` fence
//   3rd is the name of the language (if any) specified after the ```
//   4th is the contents of the ``` block up until but not including the first non whitespace char after the end ```
//   5th is the padding of the first nonblank line following the backtick block
//   6th is the first char on the next line.
var BACKTICK_CAPTURE = /(( *)```(.*$)([^]*?)```\s*)^(\s*)(\S)/m;

var CODE_EXAMPLE = 'code-example(format="linenums" language="js").';

module.exports = function convertBackticksToCodeBlocks() {
  return {
    $runAfter: ['checkUnbalancedBackTicks'],
    $runBefore: ['writeFilesProcessor'],
    $process: function(docs) {
      _.forEach(docs, function(doc) {
        if (!doc.unbalancedBackTicks) {

          // Idea here is to translate backtick ``` regions into code-example blocks.
          var captures = BACKTICK_CAPTURE.exec(doc.renderedContent);
          while (captures) {
            var entireBlock = captures[1];
            var prePad = captures[2];
            var language = captures[3];
            var blockContents = captures[4];
            var postPad = captures[5];
            var nextBlockStartChar = captures[6];
            var codeExamplePrefix = language.length ? CODE_EXAMPLE.replace('js', language) : CODE_EXAMPLE;
            // modulo op in next line insures that pad is always a multiple of 2 ( jade whitespace).
            var newPrePad = prePad.substr(2 + (prePad.length % 2)); // exdent
            var replaceVal = '\n' + newPrePad + codeExamplePrefix + escapeHtml(blockContents) + '\n';
            // if nextBlock does NOT start with a '.' then we want to restart a markdown block.
            // and that block needs to be exdented from the preceding code-example content.
            // There is also a case where immediately after the backticks, an @example (aka +makeExample) is created.
            // In this case a markdown block is not needed.
            if (nextBlockStartChar !== '.' && nextBlockStartChar !== '+') {
              if (postPad.length >= 2) {
                // modulo op in next line insures that pad is always a multiple of 2 ( jade whitespace).
                postPad = postPad.substr(2 + (postPad.length % 2)); // exdent
              }
              replaceVal = replaceVal + postPad + ':marked\n';
            }
            doc.renderedContent = doc.renderedContent.replace(entireBlock, replaceVal);
            captures = BACKTICK_CAPTURE.exec(doc.renderedContent);
          }
        }
      });
    }
  };
};