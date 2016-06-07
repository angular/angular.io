export class Hero {
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

  public id: number;

  static clone({firstName, lastName, birthdate, url, rate, id}: Hero) {
    return new Hero(firstName, lastName, birthdate, url, rate, id);
  }

  constructor(
    public firstName: string,
    public lastName?: string,
    public birthdate?: Date,
    public url?: string,
    public rate = 100,
    id?: number) {

    this.id = id != null ? id : Hero.nextId++;
  }

  get fullName() { return `${this.firstName} ${this.lastName}`; }
}
