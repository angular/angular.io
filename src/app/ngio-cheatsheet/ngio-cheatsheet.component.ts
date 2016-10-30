import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { DocInfoService, NgLang } from '../doc-info.service';

@Component({
  selector: 'ngio-cheatsheet',
  templateUrl: 'ngio-cheatsheet.component.html'
})
export class NgioCheatSheetComponent implements OnInit {
  private url: string;
  isLoaded: boolean = false;
  currentEnvironment: any;
  version: any;
  sections: any;

  // NOTE (ericjim): the src input from the old project is not being used. We are hardcoding the json
  // file name in `URL` for now. 

  constructor(
    private http: Http,
    private docInfoSvc: DocInfoService
  ) {
    this.url = `assets/${docInfoSvc.ngLang}/${docInfoSvc.vers}/guide/cheatsheet.json`
  }

  ngOnInit() {
    this.tryUrlAndSetToSrc();
  }

  tryUrlAndSetToSrc() {
    this.http.get(this.url)
      .map(resp => resp.json())
      .subscribe((data) => {
        this.currentEnvironment = data.currentEnvironment;
        this.version = data.version;
        this.sections = data.sections;
        this.isLoaded = true;
      }, 
      (e) => { 
        console.error(e); 
      });
  }
}
