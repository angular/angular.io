// #docregion all
class Hero {
  int number;
  String name;
  String power;
  String alterEgo;

  Hero(this.number, this.name, this.power, [this.alterEgo]);

  String toString() => '$number: $name ($alterEgo). Super power: $power';
}
// #enddocregion all

main() {
  // #docregion newhero
  var myHero = new Hero(
      42, 'SkyDog', 'Fetch any object at any distance', 'Leslie Rollover');
  print('My hero is ${myHero.name}.'); // "My hero is SkyDog."
  // #enddocregion newhero
}
