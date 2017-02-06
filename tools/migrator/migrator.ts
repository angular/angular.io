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
    new RemoveBlockRule('.l-main-section'),
    new RemoveBlockRule('.l-sub-section'),
    new ComponentRule('alert'),
    new RemoveBlockRule(':marked')
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

    let inComponent = false;
    let outerIndent;

    while(index < lines.length) {
      let line = lines[index];
      let indent = countIndent(line);

      if (inComponent) {
        if (line.length === 0 || indent > outerIndent) {
          output.push(line.substring(indent-outerIndent));
        } else {
          output.push('~~~\n');
          inComponent = false;
        }
      }

      if (!inComponent) {
        if (line.indexOf('.' + this.cssClass) === indent) {
          outerIndent = indent;
          inComponent = true;
          output.push('~~~ {' + line.substring(indent) + '}\n')
        } else {
          output.push(line);
        }
      }
      index++;
    }
    if (inComponent) {
      output.push('\n~~~\n');
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
        if (line.indexOf(this.blockName) === indent) {
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