// #docregion

import 'dart:async';

import 'package:angular2/core.dart';
import 'package:jsonpadding/jsonpadding.dart';

@Injectable()
class WikipediaService {
  Jsonp _jsonp;

  WikipediaService(this._jsonp);

  Future<List<String>> search(String term) async {
    // #docregion query-string
    final queryString = '?search=${term}&action=opensearch&format=json&callback=JSONP_CALLBACK';

    final uri = 'http://en.wikipedia.org/w/api.php' + queryString;

    // TODO: Error handling
    List result = await _jsonp.get(uri);
    return result[1];
    // #enddocregion query-string
  }
}
