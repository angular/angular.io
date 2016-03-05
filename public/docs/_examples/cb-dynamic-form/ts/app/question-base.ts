// #docregion
export class QuestionBase<T>{
  value: T;
  key:string;
  text:string;
  required:boolean;
  order:number;
  controlType:string;
}