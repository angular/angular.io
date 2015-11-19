/**
 * @dgService
 * @description
 * Parse the text from a cheatsheetItem tag into a cheatsheet item object
 * The text must contain a syntax block followed by zero or more bold matchers and finally a description
 * The syntax block and bold matchers must be wrapped in backticks and be separated by pipes.
 * For example
 *
 * ```
 * `<div [ng-switch]="conditionExpression">
 *   <template [ng-switch-when]="case1Exp">...</template>
 *   <template ng-switch-when="case2LiteralString">...</template>
 *   <template ng-switch-default>...</template>
 * </div>`|`[ng-switch]`|`[ng-switch-when]`|`ng-switch-when`|`ng-switch-default`
 * Conditionally swaps the contents of the div by selecting one of the embedded templates based on the current value of conditionExpression.
 * ```
 *
 * will be parsed into
 *
 * ```
 * {
 *   syntax: '<div [ng-switch]="conditionExpression">\n'+
 *           '  <template [ng-switch-when]="case1Exp">...</template>\n'+
 *           '  <template ng-switch-when="case2LiteralString">...</template>\n'+
 *           '  <template ng-switch-default>...</template>\n'+
 *           '</div>',
 *   bold: ['[ng-switch]', '[ng-switch-when]', 'ng-switch-when', 'ng-switch-default'],
 *   description: 'Conditionally swaps the contents of the div by selecting one of the embedded templates based on the current value of conditionExpression.'
 * }
 * ```
 */
module.exports = function cheatsheetItemParser() {

  return function(text) {
    var index = 0;
    var item = {
      syntax: '',
      bold: [],
      description: ''
    };

    var STATES = {
      inSyntax: function() {
        if (text.charAt(index) !== '`') throw new Error('item syntax must start with a backtick');
        index += 1;
        var syntaxStart = index;
        while(index < text.length && text.charAt(index) !== '`') index++;
        if (index === text.length) throw new Error('item syntax must end with a backtick');
        item.syntax = text.substring(syntaxStart, index);
        state = STATES.pipe;
        index++;
      },
      pipe: function() {
        if (text.charAt(index) === '|') {
          index++;
          while(index < text.length && /\s/.test(text.charAt(index))) index++;
          state = STATES.bold;
        } else {
          state = STATES.description;
        }
      },
      bold: function() {
        if (text.charAt(index) !== '`') throw new Error('bold matcher must start with a backtick');
        index += 1;
        var boldStart = index;
        while(index < text.length && text.charAt(index) !== '`') index++;
        if (index === text.length) throw new Error('bold matcher must end with a backtick');
        item.bold.push(text.substring(boldStart, index));
        state = STATES.pipe;
        index++;
      },
      description: function() {
        item.description = text.substring(index);
        state = null;
      }
    };

    var state = STATES.inSyntax;
    while(state) {
      state();
    }

    return item;
  };
}