// #docplaster

// #docregion
// #docregion v1
import 'dart:async';
import 'dart:convert';

import 'package:angular2/core.dart';
import 'package:http/browser_client.dart';
import 'hero.dart';
import 'package:http/src/response.dart';
// #enddocregion v1

@Injectable()
class HeroService {
  // #docregion endpoint
  //Url should contains at least two path, not including './' or '/'
  final String _heroesUrl = '_/heroes';

  // #enddocregion endpoint
  BrowserClient _http;

  HeroService(this._http);

// #enddocregion
// #enddocregion v1
  /*
  // #docregion endpoint-json
  String _heroesUrl = 'heroes.json'; // URL to JSON file
  // #enddocregion endpoint-json
  */
// #docregion
// #docregion v1
// #docregion methods
  // #docregion error-handling
  Future<List<Hero>> getHeroes() async {
    // #enddocregion error-handling
    // #docregion error-handling
    // ...
    // #enddocregion error-handling
    try {
      // #docregion headers
      final headers = { 'Content-Type': 'application/json'};
      // #docregion http-get
      final response = await _http.get(_heroesUrl, headers: headers);
      // #enddocregion http-get
      // #enddocregion headers
      final heroes = _extractData(response).map((value) => new Hero.fromJson(value)).toList();

      print(JSON.encode(heroes)); // eyeball results in the console
      return heroes;
      // #docregion error-handling
    } catch (e) {
      _handleError(e);
    }
    // #enddocregion error-handling
    // #docregion error-handling
  }

  // #enddocregion error-handling
  // #enddocregion v1
  // #docregion extract-data
  _extractData(Response res) {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw new Exception('Bad response status: ${res.statusCode}');
    }
    var responseMap = JSON.decode(res.body);
    return responseMap['data'] ?? responseMap;
  }

  // #enddocregion extract-data

  // #docregion error-handling
  _handleError(error) {
    // In a real world app, we might send the error to remote logging infrastructure
    print(error);
    String errMsg = error.message ?? 'Server error';
    print(errMsg); // log to console instead
    throw new Exception(errMsg);
  }

  // #enddocregion error-handling

  // #docregion addhero
  Future<Hero> addHero(String name) async {
    final headers = {'content-type': 'application/json'};
    final body = JSON.encode({'name': name});

    try {
      final response = await _http.post(_heroesUrl, headers: headers, body: body);
      return new Hero.fromJson(_extractData(response));
    } catch (e) {
      _handleError(e);
    }
  }
// #enddocregion addhero
// #docregion v1
// #enddocregion methods
}
// #enddocregion
