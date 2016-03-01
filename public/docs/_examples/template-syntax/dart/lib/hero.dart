// #docregion
class Hero {
  static int _nextId = 1;

  final int id;
  String firstName;
  String lastName;
  DateTime birthdate;
  String url;
  int rate = 100;

  Hero(this.firstName,
      {this.lastName, this.birthdate, this.url, this.rate, int id})
      : this.id = id ?? _nextId++;

  String get fullName {
    if (lastName == null) return firstName;
    return '$firstName $lastName';
  }

  Hero clone() => new Hero(firstName,
      lastName: lastName, birthdate: birthdate, url: url, rate: rate, id: id);

  @override String toString() => '$fullName (rate: $rate)';
}

final List<Hero> mockHeroes = [
  new Hero('Hercules',
      lastName: 'Son of Zeus',
      birthdate: new DateTime(1970, 2, 25),
      url: 'http://www.imdb.com/title/tt0065832/',
      rate: 325),
  new Hero('eenie', lastName: 'toe'),
  new Hero('Meanie', lastName: 'Toe'),
  new Hero('Miny', lastName: 'Toe'),
  new Hero('Moe', lastName: 'Toe')
];
