import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

export type NgLang = 'ts' | 'js' | 'dart'

/**
 * Service providing access to the Angular language and version of
 * the documentation page that the router is on.
 */
@Injectable()
export class DocInfoService {
  private _ngLang: NgLang | null;
  private _vers: string | null;
  private _rest: string | null;

  constructor(private router: Router) {
    router.events.subscribe(s => {
      if (!(s instanceof NavigationEnd)) return;
      this._update();
    });
    this._update();
  }

  private _update(): void {
    this._reset();
    const url = this.router.url; // e.g. '/docs/ts/latest/...'
    const routes = url.split('/'); // e.g. ['', 'docs', 'ts', 'latest', ...]
    if (routes[0] === '') routes.shift();

    if (routes.length >= 2 && routes[0] === 'docs') {
      const lang = this.asLang(routes[1]);
      if (lang) {
        this._ngLang = lang;
        if (routes.length >= 3) {
          this._vers = routes[2];
          this._rest = routes.splice(3).join('/');
        }
      }
    }
    // TODO: find and use a suitable logger.
    console.log(`DocInfoService: ${this.ngLang}, ${this.vers}, '${this.pageRoute}'; url: ${url}`);
  }

  /** Angular language of the docs page the router is on. */
  get ngLang(): NgLang | null { return this._ngLang; }

  /** Capitalized (full) name equivalent of `this.ngLang`. */
  get ngLangName(): string | null {
    return this.ngLangToName(this._ngLang);
  }
  
  ngLangToName(lang: string): string | null {
    switch (lang) {
      case 'dart': return 'Dart';
      case 'js': return 'JavaScript';
      case 'ts': return 'TypeScript';
      default: return null;
    }
  }

  /** Angular verions of the docs page the router is on. */
  get vers(): string | null { return this._vers; }

  /** Route URL portion after '/docs/lang/vers/'. Undefined if not on a docs page. */
  get pageRoute(): string | null { return this._rest; }

  asLang(maybeLang: string): NgLang | null {
    return (maybeLang === 'ts' || maybeLang === 'js' || maybeLang === 'dart')
      ? maybeLang as NgLang : null;
  }

  get defaultNgLang(): NgLang { return 'ts'; }
  get defaultVers(): string { return 'latest'; }

  private _reset() {
    this._ngLang = null;
    this._vers = null;
    this._rest = null;
  }
}