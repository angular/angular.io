// #docplaster

// #docregion
import 'dart:async';
import 'dart:convert';

import 'package:angular2/core.dart';
// #enddocregion v1
// #docregion import-request-options
import 'package:http/browser_client.dart';
// #enddocregion import-request-options
// #docregion v1
import 'hero.dart';

@Injectable()
class HeroService {
  final String _heroesUrl = 'app/heroes';
  BrowserClient _http;

  HeroService(this._http);

// #docregion methods
  Future<List<Hero>> getHeroes() async {
    final response = await _http.get(_heroesUrl);
    final heroes = JSON
        .decode(response.body)['data']
        .map((value) => new Hero.fromJson(value))
        .toList();
    print(JSON.encode(heroes)); // eyeball results in the console
    return heroes;
  }

  Future<Hero> addHero(String name) async {
    final headers = {'content-type': 'application/json'};
    final body = JSON.encode({'name': name});
    final response = await _http.post(_heroesUrl, headers: headers, body: body);
    return new Hero.fromJson(JSON.decode(response.body));
  }
// #enddocregion methods
}
// #enddocregion
