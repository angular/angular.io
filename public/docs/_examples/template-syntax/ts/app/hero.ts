export class Hero {
  public id:number

  constructor(
    public firstName:string,
    public lastName?:string,
    public birthdate?:Date,
    public url?:string,
    public rate:number = 100) {
      this.id = Hero.nextId++;
    }

  get fullName() {return `${this.firstName} ${this.lastName}`;}

  static nextId = 1;

  static MockHeroes = [
    new Hero(
      'Hercules',
      'Son of Zeus',
      new Date(1970, 1, 25),
      'http://www.imdb.com/title/tt0065832/',
      325),

    new Hero('eenie', 'toe'),
    new Hero('Meanie', 'Toe'),
    new Hero('Miny', 'Toe'),
    new Hero('Moe', 'Toe')
  ];
}