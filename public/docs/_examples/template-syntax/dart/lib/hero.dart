// #docregion
library template_syntax.hero;

class Hero {
  static int _nextId = 1;

  int id;
  String firstName;
  String lastName;
  DateTime birthdate;
  String url;
  int rate = 100;

  Hero(this.firstName, {this.lastName, this.birthdate, this.url, this.rate}) {
    id = _nextId++;
  }

  static List<Hero> MockHeroes = [
    new Hero('Hercules',
        lastName: 'Son of Zeus',
        birthdate: new DateTime(1970, 1, 25),
        url: 'http://www.imdb.com/title/tt0065832/',
        rate: 325),
    new Hero('eenie', lastName: 'toe'),
    new Hero('Meanie', lastName: 'Toe'),
    new Hero('Miny', lastName: 'Toe'),
    new Hero('Moe', lastName: 'Toe')
  ];

  String get fullName => '$firstName $lastName';
}
