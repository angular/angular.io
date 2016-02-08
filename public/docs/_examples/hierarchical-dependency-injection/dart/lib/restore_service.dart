// #docregion
import 'package:angular2/angular2.dart';

@Injectable()
class RestoreService<T> {
  T _originalItem;
  T _currentItem;

  setItem(T item) {
    print(item.runtimeType);
    _originalItem = item;
    _currentItem = clone(item);
  }

  T getItem() {
    return _currentItem;
  }

  T restoreItem() {
    _currentItem = _originalItem;
    return getItem();
  }

  T clone(T item) {
    // super poor clone implementation
    return item.clone();
  }
}
// #enddocregion
