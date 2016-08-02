// #docregion
import 'dart:async';
import 'dart:convert';
import 'dart:math';

// #docregion init
import 'package:angular2/core.dart';
import 'package:http/http.dart';
import 'package:http/testing.dart';

import 'hero.dart';

@Injectable()
class InMemoryDataService extends MockClient {
  static final _initialHeroes = [
    {'id': 11, 'name': 'Mr. Nice'},
    {'id': 12, 'name': 'Narco'},
    {'id': 13, 'name': 'Bombasto'},
    {'id': 14, 'name': 'Celeritas'},
    {'id': 15, 'name': 'Magneta'},
    {'id': 16, 'name': 'RubberMan'},
    {'id': 17, 'name': 'Dynama2'},
    {'id': 18, 'name': 'Dr IQ'},
    {'id': 19, 'name': 'Magma'},
    {'id': 20, 'name': 'Tornado'}
  ];
  static final List<Hero> _heroesDb =
      _initialHeroes.map((json) => new Hero.fromJson(json)).toList();
  // #enddocregion init
  static int _nextId = _heroesDb.map((hero) => hero.id).reduce(max) + 1;

  static Future<Response> _handler(Request request) async {
    var data;
    switch (request.method) {
      case 'GET':
        String prefix = request.url.queryParameters['name'] ?? '';
        final regExp = new RegExp(prefix, caseSensitive: false);
        data = _heroesDb.where((hero) => hero.name.contains(regExp)).toList();
        break;
      case 'POST':
        var name = JSON.decode(request.body)['name'];
        var newHero = new Hero(_nextId++, name);
        _heroesDb.add(newHero);
        data = newHero;
        break;
      case 'PUT':
        var heroChanges = new Hero.fromJson(JSON.decode(request.body));
        var targetHero = _heroesDb.firstWhere((h) => h.id == heroChanges.id);
        targetHero.name = heroChanges.name;
        data = targetHero;
        break;
      case 'DELETE':
        var id = int.parse(request.url.pathSegments.last);
        _heroesDb.removeWhere((hero) => hero.id == id);
        // No data, so leave it as null.
        break;
      default:
        throw 'Unimplemented HTTP method ${request.method}';
    }
    return new Response(JSON.encode({'data': data}), 200,
        headers: {'content-type': 'application/json'});
  }

  InMemoryDataService() : super(_handler);
  // #docregion init
}
