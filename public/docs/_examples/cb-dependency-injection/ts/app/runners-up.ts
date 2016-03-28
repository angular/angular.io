// #docregion
import {Injectable} from 'angular2/core';

@Injectable()
export class RunnersUp{
  names:string;
  
  constructor(names:string){
    this.names = names;
  }
}