// #docregion
// import 'rxjs/Rx'; // adds ALL RxJS operators to Observable

// Just the Observable operators we need for THIS app.
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
