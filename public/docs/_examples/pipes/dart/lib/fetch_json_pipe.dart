// #docregion
import 'dart:convert';
import 'dart:html';

import 'package:angular2/angular2.dart';

// #docregion pipe-metadata
@Pipe(name: 'fetch', pure: false)
// #enddocregion pipe-metadata
class FetchJsonPipe extends PipeTransform {
  dynamic _fetchedJson;
  String _prevUrl;

  dynamic transform(String url) {
    if (url != _prevUrl) {
      _prevUrl = url;
      _fetchedJson = null;
      HttpRequest.getString(url).then((s) {
          _fetchedJson = JSON.decode(s);
        });
    }
    return _fetchedJson;
  }
}
