// #docregion
library hero_form.hero;

class Hero {
  int number;
  String name;
  String power;
  String alterEgo;

  Hero(this.number, this.name, this.power, [this.alterEgo]);

  String toString() => '$number: $name ($alterEgo). Super power: $power';
}
