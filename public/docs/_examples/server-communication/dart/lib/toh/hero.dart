// #docregion
class Hero {
  final int id;
  final String name;

  Hero(this.id, this.name);

  factory Hero.fromJson(Map hero) {
    final _id = hero['id'];
    final id = _id is int ? _id : int.parse(_id);
    return new Hero(id,hero['name']);
  }

  Map toJson() => {'id': id, 'name': name};
}
