// #docregion
library developer_guide_intro.hero;

class Hero {
  static int _nextId = 1;
  int id;
  String name;
  String power;

  Hero(this.name, {this.power}) {
    id = _nextId++;
  }
}
