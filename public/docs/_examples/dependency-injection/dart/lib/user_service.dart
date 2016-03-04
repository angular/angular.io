// #docregion
import 'package:angular2/core.dart';

@Injectable()
class UserService {
  UserService() {
    user = _bob;
  }

  // Todo: get the user; don't 'new' it.
  User _alice = new User('Alice', true);
  User _bob = new User('Bob', false);

  // initial user is Bob
  User user;

  // swaps users
  User getNewUser() => user = user == _bob ? _alice : _bob;
}

class User {
  String name;
  bool isAuthorized;

  User(this.name, [this.isAuthorized = false]);
}
