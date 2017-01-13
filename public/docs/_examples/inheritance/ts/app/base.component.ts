import { Component, Input, Injectable } from '@angular/core';

@Injectable()
export class ServiceA {
  name = 'Service A';
}

@Injectable()
export class ServiceB {
  name = 'Service B';
}

export const BASE_PROVIDERS = [ ServiceA, ServiceB ];

export const BASE_METADATA = {
  moduleId: module.id,
  selector: 'base-comp',
  template: `
    <h3>{{speaker}} sez:</h3>
    <p id="speak">I am the base component. Koo-koo-ka-choo.</p>
    <p>{{services}}</p>
  `,
  styleUrls: [ './base.component.css'] ,
  providers: [BASE_PROVIDERS]
};

@Component(BASE_METADATA)
export class BaseComponent {
  @Input() speaker: string;
  services: string;

  constructor(private a: ServiceA, private b: ServiceB) {
    this.services = `ServiceA is ${a.name}; Service B is ${b.name}`;
  }
}
