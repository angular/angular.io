library pipe_examples.fetch_json_pipe;

import 'package:angular2/angular2.dart';
import 'dart:html';
import 'dart:async';
import 'dart:convert';

@Pipe(name: 'fetch', pure: false)
@Injectable()
class FetchJsonPipe {
  dynamic _fetchedValue;
  Future<dynamic> _fetchPromise = null;
  transform(dynamic value, [List<dynamic> args]) {
    if (_fetchPromise == null) {
      _fetchPromise = HttpRequest.getString(value).then((String json) {
        _fetchedValue = JSON.decode(json);
      });
    }
    return _fetchedValue;
  }
}
