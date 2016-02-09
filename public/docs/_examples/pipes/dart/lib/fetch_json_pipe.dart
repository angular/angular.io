import 'dart:html';
import 'dart:async';
import 'dart:convert';

import 'package:angular2/angular2.dart';

@Pipe(name: 'fetch', pure: false)
@Injectable()
class FetchJsonPipe extends PipeTransform {
  dynamic _fetchedValue;
  Future<dynamic> _fetchPromise;
  transform(dynamic value, [List<dynamic> args]) {
    if (_fetchPromise == null) {
      _fetchPromise = new Future(() async {
        _fetchedValue = JSON.decode(await HttpRequest.getString(value));
      });
    }
    return _fetchedValue;
  }
}
