import { Component, Injectable } from '@angular/core';

import { BaseComponent, BASE_METADATA, BASE_PROVIDERS, ServiceA } from './base.component';

///////// SubComponent service substitution ////
@Injectable()
export class ServiceASub {
  name = 'A-sub';
}

///////// SubComponent Metadata Trials ////

// The intended, fully specified SubComponent metadat. We know this works
const subMeta = {
  moduleId: module.id,
  selector: 'sub-comp',
  template: `
    <h3>{{speaker}} sez:</h3>
    <p id="speak">I am the SUB component. Hear me roar.</p>
    <p>{{services}}</p>
  `,
  styleUrls: [ './base.component.css'] ,
  providers: [
    BASE_PROVIDERS,
    {provide: ServiceA, useClass: ServiceASub}
  ]
};

////////////////////
// This works in JIT but not AOT
export function blendMetadata() {
  return Object.assign({}, BASE_METADATA, subMeta);
}

//////////////////////////
// Manual inheritance
const inheritMetadata = {
  // inherit (silly)
  moduleId: BASE_METADATA.moduleId,

  // Override
  selector: 'sub-comp',
  template: `
    <h3>{{speaker}} sez:</h3>
    <p id="speak">I am the SUB component. Hear me roar.</p>
    <p>{{services}}</p>
  `,

  // Extend providers (actually overrides)
  providers: [
    BASE_METADATA.providers,   // inherit
    {provide: ServiceA, useClass: ServiceASub}
  ],

  // Inherit
  styleUrls: BASE_METADATA.styleUrls   // inherit
};

////////////// SubComponent ////////////////////////

// This works in JIT and AOT
// @Component(subMeta)

// This works in JIT but not AOT
// @Component(blendMetadata())

// This works in JIT and AOT
@Component(inheritMetadata)
export class SubComponent extends BaseComponent { }
