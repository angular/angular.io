import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { DocInfoService, NgLang } from '../doc-info.service';

@Component({
  selector: 'ngio-cheatsheet',
  templateUrl: 'ngio-cheatsheet.component.html'
})
export class NgioCheatsheetComponent implements OnInit {
  language: string;
  version: string;
  sections: any[] = [];

  // NOTE (ericjim): the src input from the old project is not being used. We are hardcoding the json
  // file name in `URL` for now. 

  constructor(private http: Http, private docInfoSvc: DocInfoService) {
    const url = `/docs/${this.docInfoSvc.ngLang}/${this.docInfoSvc.vers}/guide/cheatsheet.json`
    this.http.get(url)
      .subscribe(resp => {
        const data = resp.json();
        this.language = data.currentEnvironment;
        this.version = data.version.raw;
        this.sections = data.sections;
      },
      e => { console.error(e); });
  }

  ngOnInit() { }
}
