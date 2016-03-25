// #docregion
import 'package:angular2/core.dart';

class Hero {
  String name;
  String power;

  Hero clone() {
    return new Hero()
      ..name = name
      ..power = power;
  }
}
// #enddocregion
