import {Injectable} from "angular2/core";
import {Router} from "angular2/router";

@Injectable()
export class A11yHelper {

  constructor(private _router: Router){}

  getInternalLink(hash: string, instructionName: string): string{
    let instruction = this._router.generate([instructionName]);
    let path = '/' +  instruction.toUrlPath() + hash;
    return path;
  }

  generateUniqueIdString():string {
    return (this.randomGuidSnippet() +
    this.randomGuidSnippet() + "-" +
    this.randomGuidSnippet() + "-4" +
    this.randomGuidSnippet().substr(0, 3) + "-" +
    this.randomGuidSnippet() + "-" +
    this.randomGuidSnippet() +
    this.randomGuidSnippet() +
    this.randomGuidSnippet()).toLowerCase();
  }

  getCheckboxModel():any {
    return [
      {
        name: 'Template syntax',
        value: 'Template syntax'
      },
      {
        name: 'Observables',
        value: 'Observables'
      },
      {
        name: 'Components',
        value: 'Components'
      },
      {
        name: 'Forms',
        value: 'Forms'
      }
    ];
  }

  getRadiobuttonsModel():any {
    return [
      {
        name: 'TypeScript',
        value: 'TypeScript'
      },
      {
        name: 'JavaScript',
        value: 'JavaScript'
      },
      {
        name: 'ES6',
        value: 'ES6'
      },
      {
        name: 'Dart',
        value: 'Dart'
      }
    ];
  }

  getSelectOptions():any {
    return [
      {
        name: 'Curiosity',
        value: 'Curiosity'
      },
      {
        name: 'Increased userbase',
        value: 'Increased userbase'
      },
      {
        name: 'Legal reasons',
        value: 'Legal reasons'
      }
    ];
  }

  getCountriesWorkedIn():Array<string>{
    return ['The USA', 'The Netherlands', 'South Africa', 'Germany', 'The UK'];
  }

  toggleItemInArray(stringArray:Array<string>, item:string): void {
    var entryIndex = stringArray.indexOf(item);
    if (entryIndex != -1) {
      stringArray.splice(entryIndex, 1);
    } else {
      stringArray.push(item);
    }
  }

  isStringInArray(stringArray: Array<string>, item: string): boolean {
    return stringArray.indexOf(item.toString()) != -1;
  }

  removeHtmlStringBreaks(inputValue: string):string{
    return inputValue.replace(new RegExp('<div>', 'g'), '')
      .replace(new RegExp('</div>', 'g'), '\n')
      .replace(new RegExp('<br>', 'g'), '')
  }

  private randomGuidSnippet():string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}
