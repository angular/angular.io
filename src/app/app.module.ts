import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {MaterialModule} from '@angular/material';
import { AppComponent } from './app.component';
import { LiveExampleComponent } from './live-example/live-example.component';
import { DocInfoService } from './doc-info.service';
import { NgioCheatsheetComponent } from './ngio-cheatsheet/ngio-cheatsheet.component';
import { CodeExampleComponent } from './code-example/code-example.component';
import { CopyContainerComponent } from './copy-container/copy-container.component';
import { CodeTabsComponent } from './code-tabs/code-tabs.component';
import { ApiListComponent } from './api-list/api-list.component';
import { AnnouncementBarComponent } from './announcement-bar/announcement-bar.component';
import { AboutCardComponent } from './about-card/about-card.component';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CopyContainerComponent,
    CodeExampleComponent,
    CodeTabsComponent,
    LiveExampleComponent,
    NgioCheatsheetComponent,
    ApiListComponent,
    AnnouncementBarComponent,
    AboutCardComponent,
    AboutDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  entryComponents: [AboutDialogComponent],
  providers: [
    DocInfoService,
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy},
    { provide: APP_BASE_HREF, useValue: '.' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
