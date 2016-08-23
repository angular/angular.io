// #docregion
import 'dart:async';

import 'package:angular2/core.dart';
import 'package:jsonpadding/jsonpadding.dart';

@Injectable()
class WikipediaService {
  Future<List<String>> search(String term) async {
    // #docregion call-jsonp
    Uri uri = new Uri(
        scheme: 'http',
        host: 'en.wikipedia.org',
        path: 'w/api.php',
        queryParameters: {
          'search': term,
          'action': 'opensearch',
          'format': 'json'
        });
    // TODO: Error handling
    List result = await jsonp(uri);
    return result[1];
    // #enddocregion call-jsonp
  }
}
