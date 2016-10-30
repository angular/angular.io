import { Component, OnInit, Input, Attribute, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { DocInfoService, NgLang } from '../doc-info.service';

const _liveExampleInputs = ['img', 'lang', 'name', 'plnkr', 'srcText'];

/**
* Angular.io Live Example Directive (taken from ng1.io docs)
*
* Renders a link to a live/host example of the doc chapter
* app this directive is contained in.
*
* Usage:
*   <live-example [name="..."] [plnkr="..."] [img="..."] [lang="..."] [embedded] [srcText="..."]>text</live-example>
* Example:
*   <p>Run <live-example>Try the live example</live-example></p>.
*   // ~/resources/live-examples/{chapter}/ts/plnkr.html
*
*   <p>Run <live-example name="toh-1">this example</live-example></p>.
*   // ~/resources/live-examples/toh-1/ts/minimal.plnkr.html
*
*   <p>Run <live-example plnkr="minimal"></live-example></p>.
*   // ~/resources/live-examples/{chapter}/ts/minimal.plnkr.html
*
*   <live-example embedded></live-example>
*   // ~/resources/live-examples/{chapter}/ts/eplnkr.html
*
*   <live-example embedded plnkr="minimal"></live-example>
*   // ~/resources/live-examples/{chapter}/ts/minimal.eplnkr.html
*/
@Component({
  selector: 'live-example',
  templateUrl: 'live-example.component.html',
  styleUrls: ['live-example.component.css'], // use .css rather than .scss for now
  inputs: _liveExampleInputs
})
export class LiveExampleComponent implements OnInit {
  /*@Input()*/ name: string;
  /*@Input()*/ plnkr: string;
  /*@Input()*/ img: string;
  /*@Input()*/ lang: string;
  /*@Input()*/ srcText: string;

  embedded: boolean;
  liveExampleAnchorText: string; // HTML; was named `text` in ng1 directive
  liveExampleUrl: string; // URL to inlined plnkr or Dart live example
  src: SafeResourceUrl; // URL to embedded plnkr
  imgSrc: string;
  viewSourceUrl: string; // URL to sources (used for Dart)

  // when false the image placeholder shows, when true image is removed and plnkr is displayed.
  embeddedShow: boolean = false;

  constructor(
    elementRef: ElementRef,
    private sanitizer: DomSanitizer,
    private http: Http,
    private docInfoSvc: DocInfoService,
  ) {
    this.liveExampleAnchorText = elementRef.nativeElement.liveExampleContent || 'live example';
    this.embedded = elementRef.nativeElement.hasAttribute('embedded');
    // Manually get @Input's:
    _liveExampleInputs.forEach(inputName => {
      if (!this[inputName]) this[inputName] = elementRef.nativeElement.getAttribute(inputName);
    });
    if (!this.lang) this.lang = docInfoSvc.ngLang;
  }

  ngOnInit() {
    // TODO: use something like a path lib to be able to extra basename, etc.
    const urlSegs = this.docInfoSvc.path.replace(/(\.html|_html)([#;].*)?$/, '').split('/');
    const ex = this.name || this.exampleName(urlSegs[urlSegs.length - 1]);

    const isForDart = this.lang === 'dart';
    const isForJs = this.lang === 'js';
    const exLang = isForDart ? 'dart' : isForJs ? 'js' : 'ts';

    let plnkr = this.embedded ? 'eplnkr' : 'plnkr';
    if (this.plnkr) plnkr = this.plnkr + '.' + plnkr;
    let href = '/resources/live-examples/' + ex + '/' + exLang + '/' + plnkr + '.html';

    if (this.embedded && !isForDart) {
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(href);
      const defaultImg = 'plunker/placeholder.png';
      this.imgSrc = `/resources/images/${this.img || defaultImg}`;
      // template = embeddedTemplate(href, img);
    } else {
      if (isForDart) href = 'http://angular-examples.github.io/' + ex;

      // Link to live example.
      // var template = a(text, { href: href, target: '_blank' });
      this.liveExampleUrl = href;

      // The hosted example and sources are in different locations for Dart.
      // Also show link to sources for Dart.
      if (isForDart) {
        if (!this.srcText) this.srcText = 'view source';
        this.viewSourceUrl = 'http://github.com/angular-examples/' + ex;
        // template = span(template + ' (' + a(srcText, { href: srcHref, target: '_blank' }) + ')');
      }
    }

  }

  // TODO: rename method since this doesn't toggle.
  toggleEmbedded() {
    this.embeddedShow = true;
  }

  // TODO: factor out exampleName() as it was in ng1.io
  exampleName(docPageName): string {
    return pageNameToExampleName[docPageName] || docPageName;
  }
}

// This mapping might be useful as a general name mapping service
const pageNameToExampleName = {
  'a1-a2-quick-reference': 'cb-a1-a2-quick-reference',
  'component-communication': 'cb-component-communication',
  'component-relative-paths': 'cb-component-relative-paths',
  'dynamic-form': 'cb-dynamic-form',
  'form-validation': 'cb-form-validation',
  'set-the-document-title': 'cb-set-document-title',
  'guide': 'architecture',
  'tutorial': 'toh-6',
  'toh-pt1': 'toh-1',
  'toh-pt2': 'toh-2',
  'toh-pt3': 'toh-3',
  'toh-pt4': 'toh-4',
  'toh-pt5': 'toh-5',
  'toh-pt6': 'toh-6'
};
