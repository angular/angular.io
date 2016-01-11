export class Hero {
  id:number
  constructor(
    public name:string,
    public power?:string){
      this.id = nextId++;
    }
}

var nextId = 1;
