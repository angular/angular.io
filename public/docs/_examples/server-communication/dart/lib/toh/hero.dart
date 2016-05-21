// #docregion
int _toInt(id) => id is int ? id : int.parse(id);

class Hero {
  final int id;
  final String name;

  Hero(this.id, this.name);

  factory Hero.fromJson(Map<String, dynamic> hero) =>
      new Hero(_toInt(hero['id']), hero['name']);

  Map toJson() => {'id': id, 'name': name};
}
