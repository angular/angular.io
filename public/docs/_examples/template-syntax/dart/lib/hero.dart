library template_syntax.hero;

class Hero {
  static int _nextId = 0;
  int id;
  String firstName;
  String lastName;
  DateTime birthdate;
  String url;
  int rate = 100;

  Hero(this.firstName, {this.lastName, this.birthdate, this.url, this.rate}) {
    this.id = _nextId++;
  }

  String get fullName => firstName + ' ' + lastName;
}
