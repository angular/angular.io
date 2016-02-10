// #docregion
class Hero {
  int id;
  String name;

  Hero(this.id, this.name);

  Hero.fromJson(Map hero) {
    final _id = hero['id'];
    id = _id is int ? _id : int.parse(_id);
    name = hero['name'];
  }

  Map toJson() => {'id': id, 'name': name};
}
