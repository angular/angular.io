// (ericjim): this component is not currently used, it was commited into the codebase because it is an improvement over
// it's previous verision.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

const _resources = ['Development', 'Education', 'Community'];
const URL_PATH = '/resources/resources.json';

type ResourceItem = {
  desc: String,
  rev: Boolean,
  title: String,
  url: String
}

type ResourceGroup = {
  key: String,
  items: any[]
}

@Component({
  selector: 'resources-page',
  templateUrl: 'resources-page.component.html',
  styleUrls: ['resources-page.component.css']
})
export class ResourcesPageComponent implements OnInit {
  developmentItems = [];
  educationItems = [];
  communityItems = [];

  adjustJumpnav: boolean = false;

  constructor(private http: Http) {
    http.get(URL_PATH)
      .toPromise()
      .then(resp => {
        const result = resp.json();
        _resources.forEach((k, i) => {
          const key = `${k.toLowerCase()}Items`;
          this[key] = flattenFirebaseObject(result[k]);
        });
      })
      .catch(e => e);
  }

  changeScrollPos() {
    if (window.scrollY > 250) {
      this.adjustJumpnav = true;
    } else {
      this.adjustJumpnav = false;
    }
  }

  ngOnInit() {
    window.addEventListener('scroll', this.changeScrollPos.bind(this), false);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.changeScrollPos.bind(this), false);
  }
}

function flattenFirebaseObject(result): ResourceGroup[] {
  return Object.keys(result).map(key => { 
    const resources = result[key].resources;
    const resourcesItems: ResourceItem[] = Object.keys(resources).map(resourcesKey => resources[resourcesKey]);

    return {
      'key': key, 'items': resourcesItems 
    };
  });
}