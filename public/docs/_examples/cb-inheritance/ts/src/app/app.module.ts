import { BrowserModule }                 from '@angular/platform-browser';
import { NgModule }                      from '@angular/core';

import { BasicExampleModule }            from './basic/basic-example.module';
import { BasicExampleComponent }         from './basic/basic-example.component';

import { ClassMetadataExampleModule }    from './class-metadata/class-metadata-example.module';
import { ClassMetadataExampleComponent } from './class-metadata/class-metadata-example.component';

import { PropertyMetadataExampleModule } from './property-metadata/property-metadata-example.module';
import { AppComponent }                  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BasicExampleModule,
    ClassMetadataExampleModule,
    PropertyMetadataExampleModule
  ],
  declarations: [
    AppComponent,
    BasicExampleComponent,
    ClassMetadataExampleComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
