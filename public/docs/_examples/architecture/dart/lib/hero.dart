class Hero {
  static int _nextId = 1;
  final int id;
  String name, power;

  Hero(this.name, [this.power = '']) : id = _nextId++;
}
