import 'package:angular2/bootstrap.dart';
import 'package:pipe_examples/hero_birthday.dart';
import 'package:pipe_examples/chained_pipes.dart';
import 'package:pipe_examples/power_booster.dart';
import 'package:pipe_examples/power_boost_calculator.dart';
import 'package:pipe_examples/my_hero.dart';
import 'package:pipe_examples/heroes_list.dart';

main() {
  bootstrap(HeroBirthday);
  bootstrap(ChainedPipes);
  bootstrap(PowerBooster);
  bootstrap(PowerBoostCalculator);
  bootstrap(MyHero);
  bootstrap(HeroesList);
}
