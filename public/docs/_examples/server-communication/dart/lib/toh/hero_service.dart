// #docplaster

// #docregion
import 'package:angular2/angular2.dart';
import 'dart:convert';
import 'dart:async';
// #enddocregion v1
// #docregion import-request-options
import 'package:http/browser_client.dart';
// #enddocregion import-request-options
// #docregion v1
import 'hero.dart';

@Injectable()
class HeroService {
  String _heroesUrl = 'app/heroes';

  BrowserClient _http;

  HeroService(this._http);

// #docregion methods
  Future<List<Hero>> getHeroes() async {
    final response = await _http.get(_heroesUrl);
    Map data = JSON.decode(response.body);
    List<Hero> heroes = _toHeroes(data['data']);
    print(JSON.encode(heroes)); // eyeball results in the console
    return heroes;
  }

  List<Hero> _toHeroes(List data) {
    List heroes = [];
    data.forEach((item) => heroes.add(new Hero.fromJson(item)));
    return heroes;
  }

  Future<Hero> addHero(String name) async {
    Map headers = {'content-type': 'application/json'};
    String body = JSON.encode({'name': name});
    final response = await _http.post(_heroesUrl, headers: headers, body: body);
    return new Hero.fromJson(JSON.decode(response.body));
  }
// #enddocregion methods
}
// #enddocregion
