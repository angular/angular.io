class Hero {
  final String name;
  final bool canFly;

  const Hero(this.name, this.canFly);

  String toString() => "$name (${canFly ? 'can fly' : 'doesn\'t fly'})";
}

const List<Hero> mockHeroes = const <Hero>[
  const Hero("Windstorm", true),
  const Hero("Bombasto", false),
  const Hero("Magneto", false),
  const Hero("Tornado", true),
];
