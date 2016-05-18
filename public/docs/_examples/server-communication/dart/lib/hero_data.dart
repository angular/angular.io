// #docregion
import 'package:http/browser_client.dart';
import 'package:http_in_memory_web_api/http_in_memory_web_api.dart';

CreateDb _createDb = () => {
      'heroes': [
        {"id": "1", "name": "Windstorm"},
        {"id": "2", "name": "Bombasto"},
        {"id": "3", "name": "Magneta"},
        {"id": "4", "name": "Tornado"}
      ]
    };

BrowserClient HttpClientBackendServiceFactory() =>
  new HttpClientInMemoryBackendService(_createDb);
