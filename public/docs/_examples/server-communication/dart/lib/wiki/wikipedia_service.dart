// #docregion

import 'dart:async';

import 'package:angular2/core.dart';
import 'package:jsonpadding/jsonpadding.dart';

@Injectable()
class WikipediaService {
  Jsonp _jsonp;

  WikipediaService(this._jsonp);

  Future<List<String>> search(String term) async {
    // #docregion call-jsonp
    Uri uri = new Uri(
      scheme: 'http',
      host: 'en.wikipedia.org',
      path: 'w/api.php',
    // #docregion search-parameters
      queryParameters: {
        'search': term,
        'action': 'opensearch',
        'format': 'json'
      }
    // #enddocregion search-parameters
    );
    // TODO: Error handling
    List result = await _jsonp.get(uri);
    return result[1];
    // #enddocregion call-jsonp
  }
}
