// #docregion
import { Component, Input } from '@angular/core';
import { ListBaseComponent } from './list-base.component';
import { Album } from '../models';

@Component({
  selector: 'my-album-list',
  template: `
    <h2>{{ genre }} Albums</h2>
    <ul>
      <li *ngFor="let album of list">
        {{album.artist}}: {{ album.title }}
        <button (click)="remove(album)">X</button>
      </li>
    </ul>
  `
})
export class AlbumListComponent extends ListBaseComponent<Album> {
  @Input() genre: string;
}
