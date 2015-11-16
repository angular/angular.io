library template_syntax.hero;

class Hero {
  int id;
  String firstName;
  String lastName;
  DateTime birthdate;
  String url;
  int rate = 100;

  Hero(this.firstName, {this.lastName, this.birthdate, this.url, this.rate}) {
    this.id = _nextId++;
  }

  get fullName => firstName + ' ' + lastName;

  var _nextId = 0;
}
