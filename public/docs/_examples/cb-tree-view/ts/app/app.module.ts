import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddHeroComponent } from './add-hero.component';
import { HeroNodeComponent } from './hero-node.component';
import { TreeViewComponent } from './tree-view.component';
import { TreeNodeService } from './tree-node.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    AddHeroComponent,
    HeroNodeComponent,
    TreeViewComponent
  ],
  providers: [ TreeNodeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
