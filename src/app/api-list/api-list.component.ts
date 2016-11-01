import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Http} from '@angular/http';
import { DocInfoService, NgLang } from '../doc-info.service';
import 'rxjs/add/operator/toPromise';

type Lang = 'dart' | 'ts' | 'js';
export type ApiStyleClass = '' | 'stable' | 'directive' | 'decorator' | 'class' | 'interface' | 'function' | 'enum' | 'const' | 'pipe';
export type ApiMatch = '' | 'stable' | 'directive' | 'decorator' | 'class' | 'interface' | 'function' | 'enum' | 'var' | 'let' | 'const' | 'pipe';

export interface ApiType {
  cssClass: ApiStyleClass,
  title: string,
  matches: Array<ApiMatch>
}

@Component({
  selector: 'api-list',
  templateUrl: 'api-list.component.html'
})
export class ApiListComponent implements OnInit {
  @Input() src: string = 'api-list.json';

  isApiLoaded: boolean = false;
  showApiMenu: boolean = false;
  showStatusMenu: boolean = false;
  searchText: string = '';
  emptyApiType: ApiType = { cssClass: '', title: 'Type: All', matches: [''] };
  emptyStatusType = { cssClass: '', title: 'Status: All', matches: [''] };
  selectedApiType: ApiType = this.emptyApiType; // default to all items
  selectedApiStatus: any = this.emptyStatusType;
  groupedSections = [];
  sections: any[];

  _apiTypes: Array<ApiType> = [
    { cssClass: '', title: 'All', matches: [''] },
    { cssClass: 'directive', title: 'Directive', matches: ['directive'] },
    { cssClass: 'pipe', title: 'Pipe', matches: ['pipe'] },
    { cssClass: 'decorator', title: 'Decorator', matches: ['decorator'] },
    { cssClass: 'class', title: 'Class', matches: ['class'] },
    { cssClass: 'interface', title: 'Interface', matches: ['interface'] },
    { cssClass: 'function', title: 'Function', matches: ['function'] },
    { cssClass: 'enum', title: 'Enum', matches: ['enum'] },
    { cssClass: 'const', title: 'Const', matches: ['var', 'let', 'const'] }
  ];

  apiStatuses = [
    { cssClass: '', title: 'All', matches: [''] },
    { cssClass: 'stable', title: 'Stable', matches: ['stable']},
    { cssClass: 'deprecated', title: 'Deprecated', matches: ['deprecated']},
    { cssClass: 'experimental', title: 'Experimental', matches: ['experimental']},
    { cssClass: 'security', title: 'Security Risk', matches: ['security']}
  ];

  // Dart API entries are not tagged Stable vs Experimental.
  _apiTypesForDart: Array<ApiType> = this._apiTypes.filter(t =>
    t.title.match(/All|Class|Const|Function/));

  constructor(
    private http: Http,
    private docInfoSvc: DocInfoService,
    private location: Location
  ) {
    this.applyFilterOnSections();
  }

  get ngLang() { return this.docInfoSvc.ngLang; }

  ngOnInit(): void {
    const urlPrefix = this.docInfoSvc.path.split('?')[0]; // .replace(/^\/docs\//, '/assets/');
    const url = `${urlPrefix}/${this.src}`;
    this.fetchUrl(url);

    // extract type and status from url
    var split = this.docInfoSvc.path.split('?');
    if (split.length > 1) {
      const paramsRaw = split[1].split('&');
      const type = paramsRaw[0] ? paramsRaw[0].split('=')[1] : '';
      const status = paramsRaw[1] ? paramsRaw[1].split('=')[1] : '';

      // update our internal model if a match for type is found
      const apiTypes = this._apiTypes.filter(t => t.matches[0] === type);
      if (apiTypes.length > 0) this.selectedApiType = apiTypes[0];

      // update our internal model if a match for status is found
      const apiStatuses = this.apiStatuses.filter(t => t.matches[0] === status);
      if (apiStatuses.length > 0) this.selectedApiStatus = apiStatuses[0];
    }
  }

  fetchUrl(url): Promise<any> {
    return this.http.get(url)
      .toPromise()
      .then(resp => {
        this.sections = resp.json();
        this.groupedSections = Object.keys(this.sections).map((title) => {
          return { title: title, items: this.sections[title] };
        });
        this.isApiLoaded = true;
        this.applyFilterOnSections();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // TODO: report via page.
    return Promise.reject(error.message || error);
  }

  get apiTypes(): Array<ApiType> {
    return this.ngLang === 'dart' ? this._apiTypesForDart : this._apiTypes;
  }


  filterSectionEntries(section) {
    for (let item of section.items) {
      const isPassingApiFilters = (this.isSearchingAllBucketsFiltered() || this.isMatchingBucket(item));
      const isPassingStatusFilters = this.isSearchingAllStatusesFiltered() || this.isMatchingStatus(item) || this.isSecurityRisk(item);

      item.show = (isPassingApiFilters && isPassingStatusFilters) && this.isTextMatching(item)
    }
  };

  applyFilterOnSections() {
    // Cannot guarantee that <param> in queryParam=<param> is an ApiMatch so we union type check it with a string.
    const selectedApiMatchOnUrl: string | ApiMatch = this.docInfoSvc.path.split('=')[1];
    this.changeSelectedApiTypeForApiMatch(selectedApiMatchOnUrl);
    if (this.isApiLoaded) {
      this.groupedSections.forEach((s) => {
        this.filterSectionEntries(s)
      });
    }
  }

  changeSelectedApiTypeForApiMatch(match: string | ApiMatch) {
    const apiTypesThatMatch = this.apiTypes.filter((apiType) => {
      const matchName = apiType.matches[0];
      return matchName === match; // Should this be: apiType.matches.indexOf(match as ApiMatch) >= 0; ?
    });

    const shouldUpdateSelectedApiType = apiTypesThatMatch.length > 0;

    if (shouldUpdateSelectedApiType) {
      this.selectedApiType = apiTypesThatMatch[0];
    }
  }

  isSearchingAllBucketsFiltered(): boolean {
    return this.selectedApiType.matches[0] === '';
  }

  isSearchingAllStatusesFiltered(): boolean {
    return this.selectedApiStatus.matches[0] === '';
  }

  isTextMatching(item): boolean {
    return (!this.searchText || item.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1);
  }

  isMatchingBucket(item): boolean {
    // Hmm, should be able to use [].includes().
    return this.selectedApiType.matches.indexOf(item.docType) >= 0;
  }

  isMatchingStatus(item): boolean {
    return this.selectedApiStatus.matches.indexOf(item.stability) >= 0;
  }

  isSecurityRisk(item): boolean {
    // if true "is a security risk", if false "is not a security risk"
    // I know, it's confusing.
    const _isSecurityRisk = !item.secure;
    return this.selectedApiStatus.matches[0] === 'security' && _isSecurityRisk;
  }

  isEntryStable(item): boolean {
    return item.stability === this.selectedApiType.matches[0];
  }

  isApiTypeSelected(apiType) {
    return apiType === this.selectedApiType;
  }

  hasVisibleEntries(section): boolean {
    return section.items.filter((i) => { return i.show }).length > 0;
  }

  triggerSearch(value) {
    this.searchText = value;
    this.applyFilterOnSections();
  }

  setApiType(t) {
    this.selectedApiType = t;

    const type = t.matches[0];
    const status = this.selectedApiStatus.matches[0];

    this.location.go('', `${ type ? 'type=' + type : ''}${ status ? '&status=' + status : ''}`);
    this.applyFilterOnSections();
    this.toggleApiMenu();
  }

  setStatus(s) {
    this.selectedApiStatus = s;

    const type = this.selectedApiType.matches[0];
    const status = s.matches[0];

    this.location.go('', `${ type ? 'type=' + type : ''}${ status ? '&status=' + status : ''}`);
    this.applyFilterOnSections();
    this.toggleStatusMenu();
  }

  toggleApiMenu() {
    this.showApiMenu = !this.showApiMenu;
  }

  toggleStatusMenu() {
    this.showStatusMenu = !this.showStatusMenu;
  }

}
