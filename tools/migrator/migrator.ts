/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

abstract class Rule {
  abstract process(content: string): string;
}

export class Migrator {
  rules = [
    new RemoveRule(/include \.\.\/_util-fns[\s\n\r]*/),
    new RemoveRule(/\.l-main-section[\s\n\r]*/),
    new ComponentRule('alert'),
    new RemoveBlockRule('marked')
  ];

  process(content: string) {
    this.rules.forEach((rule) => content = rule.process(content));
    return content;
  }
}

class RemoveRule extends Rule {
  constructor(private remove: RegExp) {
    super();
  }

  process(content: string): string {
    return content.replace(this.remove, '');
  }
}

class ComponentRule extends Rule {
  constructor(private cssClass: string) {
    super();
  }

  process(content: string) {
    const lines = content.split('\n');
    const output = [];
    let index = 0;
    while(index < lines.length) {
      let line = lines[index];
      const outerIndent = countIndent(line);
      if (line.indexOf('.' + this.cssClass) === outerIndent) {

        // found a "component"
        const cssClasses = line.substr(outerIndent);
        output.push('~~~ {' + cssClasses + '}\n');

        // now extract the content
        // the first line indicates the inner indent
        index++;
        line = lines[index];
        const innerIndent = countIndent(line);
        output.push(line.substr(innerIndent-outerIndent));

        // extract the rest of the content until we hit something that is less indented
        index++;
        while(index < lines.length) {
          line = lines[index];
          if (line.length === 0 || countIndent(line) >= innerIndent) {
            output.push(line.substr(innerIndent-outerIndent));
            index++;
          } else {
            break;
          }
        }
        // Add in an extra empty line if there isn't already one
        if (output[output.length-1].trim() !== '') {
          output.push('')
        }
        output.push('~~~\n');
      }
      if (index < lines.length) {
        output.push(line);
        index++;
      }
    }
    return output.join('\n');
  }
}

class RemoveBlockRule extends Rule {
  constructor(private blockName: string) {
    super();
  }

  process(content: string) {
    const lines = content.split('\n');
    const output = [];
    let index = 0;

    let inMarkdown = false;
    let outerIndent;

    while(index < lines.length) {
      let line = lines[index];
      let indent = countIndent(line);

      if (inMarkdown) {
        if (line.length === 0 || indent > outerIndent) {
          output.push(line.substring(indent-outerIndent));
        } else {
          inMarkdown = false;
        }
      }

      if (!inMarkdown) {
        if (line.indexOf(':' + this.blockName) === indent) {
          outerIndent = indent;
          inMarkdown = true;
        } else {
          output.push(line);
        }
      }
      index++;
    }
    return output.join('\n');
  }
}

function countIndent(text: string) {
  let index = 0;
  while(text[index] === ' ') {
    index++;
  }
  return index;
}