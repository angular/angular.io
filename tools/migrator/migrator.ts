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
    new RemoveBlockRule(':marked'),
    new ConvertMakeExampleRule(),
    new ConvertMakeTabsRule()
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

abstract class ConvertMacroRule extends Rule {
  private macroMatcher: RegExp;

  constructor(macroName: string) {
    super();
    this.macroMatcher = new RegExp(`(\\s*)\\+${macroName}\\(([^)]*)\\)(?:\\(([^)]*)\\))?`);
  }

  process(content: string): string {
    return content.replace(this.macroMatcher, (match: string, indentation: string, paramString: string, extraParamString: string) => {
      const params = parseParams(paramString);
      const extraParams = parseParams(extraParamString);
      return this.replacer(indentation, params, extraParams);
    });
  }

  protected abstract replacer(indentation: string, params: string[], extraParams: string[]) : string;
}

class ConvertMakeExampleRule extends ConvertMacroRule {
  constructor() {
    super('makeExample');
  }

  replacer(indentation: string, params: string[], extraParams: string[]) : string {
    const filePath = params[0];
    const region = params[1] ? ` region=${params[1]}` : '';
    const lineNums = extraParams.indexOf(`format='.'`) !== -1 ? ` linenums='false'` : '';

    return indentation + `{@example ${filePath}${region}${lineNums}}`;
  }
}

class ConvertMakeTabsRule extends ConvertMacroRule {
  constructor() {
    super('makeTabs');
  }

  replacer(indentation: string, params: string[], extraParams: string[]) : string {
    const files = parseInnerParams(params[0]);
    const regions = parseInnerParams(params[1]);
    const titles = parseInnerParams(params[2]);

    const output = [];

    output.push('<md-tab-group>');

    files.forEach((file, index) => {
      const region = regions[index] ? ` region = '${regions[index]}'` : '';
      const title = titles[index] || file;
      output.push(`  <md-tab label="${title}">`);
      output.push(`    {@example '${file}'${region}}`)
      output.push(`  </md-tab>`);
    });
    output.push('</md-tab-group>');
    return output.map(line => indentation + line).join('\n');
  }
}

// Count the indentation for the current line
function countIndent(text: string) {
  let index = 0;
  while(text[index] === ' ') {
    index++;
  }
  return index;
}

// Split the string into the comma delimited parameters
// Takes into account that a param may be a string that contains commas.
function parseParams(paramString: string) {
  const params = [];
  if (!paramString) {
    return [];
  }
  let stringChar = null;
  let index = 0;
  let paramStart = 0;
  while(index < paramString.length) {
    if (stringChar) {
      index = paramString.indexOf(stringChar, index);
      if (index === -1) {
        throw new Error(`No matching string end character ${stringChar} in param ${paramString}`);
      }
      stringChar = null;
    } else {
      const char = paramString[index];
      if ('\'"`'.indexOf(char) !== -1) {
        // starting a new string
        stringChar = char;
      } else if (char === ',') {
        // ending a parameter
        params.push(paramString.substring(paramStart, index).trim());
        paramStart = index + 1;
      }
    }
    index++;
  }
  // capture last parameter
  params.push(paramString.substring(paramStart, index).trim());
  return params;
}

function parseInnerParams(paramString: string) {
  if (paramString === 'null') {
    return [];
  }
  const firstChar = paramString[0];
  if ('\'"`'.indexOf(firstChar) !== -1) {
    paramString = paramString.substr(1, paramString.length-2);
    console.log(paramString);
  }
  return parseParams(paramString);
}