// #docregion
library displaying_data.hero;

class Hero {
  // #docregion id-parameter
  int id;
  // #enddocregion id-parameter
  String name;

  Hero(this.id, this.name);
  String toString() => '$id: $name';
}
// #enddocregion
