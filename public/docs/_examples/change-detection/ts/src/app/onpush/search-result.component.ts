// #docregion
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'hero-search-result',
  template: `
    {{ getPrefix() }}<span class="match">{{ getMatch() }}</span>{{ getSuffix() }}
  `,
  styles: [`.match { background-color: yellow; }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent {
  @Input() searchResult: string;
  @Input() searchTerm: string;

  getPrefix() {
    let matchIdx = this.getSearchTermMatchIndex();
    return this.searchResult.substring(0, matchIdx);
  }

  getMatch() {
    let matchIdx = this.getSearchTermMatchIndex();
    return this.searchResult.substring(matchIdx, matchIdx + this.searchTerm.length);
  }

  getSuffix() {
    let matchIdx = this.getSearchTermMatchIndex();
    return this.searchResult.substring(matchIdx + this.searchTerm.length);
  }

  private getSearchTermMatchIndex() {
    return this.searchResult.toLowerCase().indexOf(this.searchTerm.toLowerCase());
  }

}
