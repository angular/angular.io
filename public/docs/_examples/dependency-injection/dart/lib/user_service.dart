// #docregion
import 'package:angular2/core.dart';

class User {
  final String name;
  final bool isAuthorized;

  User(this.name, [this.isAuthorized = false]);
}

// Todo: get the user; don't 'new' it.
final User _alice = new User('Alice', true);
final User _bob = new User('Bob', false);

@Injectable()
class UserService {
  User user;

  UserService() : user = _bob;

  // swap users
  User getNewUser() => user = user == _bob ? _alice : _bob;
}
