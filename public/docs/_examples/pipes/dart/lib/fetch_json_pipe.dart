// #docregion
import 'dart:html';
import 'dart:async';
import 'dart:convert';

import 'package:angular2/angular2.dart';

// #docregion pipe-metadata
@Pipe(name: 'fetch', pure: false)
// #enddocregion pipe-metadata
@Injectable() // FIXME(chalin): unnecessary?
class FetchJsonPipe extends PipeTransform {
  dynamic _fetchedValue;
  Future<dynamic> _fetchPromise;

  transform(String url) {
    if (_fetchPromise == null) {
      _fetchPromise = new Future(() async {
        _fetchedValue = JSON.decode(await HttpRequest.getString(url));
      });
    }
    return _fetchedValue;
  }
}
