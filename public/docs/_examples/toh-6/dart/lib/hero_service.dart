// #docplaster
// #docregion , imports
import 'dart:async';
import 'dart:convert';

import 'package:angular2/core.dart';
import 'package:http/http.dart';

import 'hero.dart';
// #enddocregion imports

@Injectable()
class HeroService {
  // #docregion update
  static final _headers = {'Content-Type': 'application/json'};
  // #enddocregion update
  // #docregion getHeroes
  static const _heroesUrl = 'app/heroes'; // URL to web API

  final Client _http;

  HeroService(this._http);

  Future<List<Hero>> getHeroes() async {
    try {
      final response = await _http.get(_heroesUrl);
      final heroes = _extractData(response)
          .map((value) => new Hero.fromJson(value))
          .toList();
      return heroes;
      // #docregion catch
    } catch (e) {
      throw _handleError(e);
    }
    // #enddocregion catch
  }

  // #docregion extract-data
  dynamic _extractData(Response resp) => JSON.decode(resp.body)['data'];
  // #enddocregion extract-data

  // #docregion handleError
  Exception _handleError(dynamic e) {
    print(e); // for demo purposes only
    return new Exception('Server error; cause: $e');
  }
  // #enddocregion handleError, getHeroes

  Future<Hero> getHero(int id) async =>
      (await getHeroes()).firstWhere((hero) => hero.id == id);

  // #docregion create
  Future<Hero> create(String name) async {
    try {
      final response = await _http.post(_heroesUrl,
          headers: _headers, body: JSON.encode({'name': name}));
      return new Hero.fromJson(_extractData(response));
    } catch (e) {
      throw _handleError(e);
    }
  }
  // #enddocregion create
  // #docregion update

  Future<Hero> update(Hero hero) async {
    try {
      var url = '$_heroesUrl/${hero.id}';
      final response =
          await _http.put(url, headers: _headers, body: JSON.encode(hero));
      return new Hero.fromJson(_extractData(response));
    } catch (e) {
      throw _handleError(e);
    }
  }
  // #enddocregion update

  // #docregion delete
  Future<Null> delete(int id) async {
    try {
      var url = '$_heroesUrl/$id';
      await _http.delete(url, headers: _headers);
    } catch (e) {
      throw _handleError(e);
    }
  }
  // #enddocregion delete

}
