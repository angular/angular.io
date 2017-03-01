import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasComponent }                  from './canvas.component';
import { PropertyMetadataExampleComponent } from './property-metadata-example.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    CanvasComponent,
    PropertyMetadataExampleComponent
  ],
  exports: [ PropertyMetadataExampleComponent ]
})
export class PropertyMetadataExampleModule {
}
