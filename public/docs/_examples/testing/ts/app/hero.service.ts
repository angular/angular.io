//import {Injectable} from 'angular2/angular2'; // Don't get it from Angular
import {Injectable} from './decorators'; // Use the app's version
import {Hero} from './hero';
import {BackendService} from './backend.service';

@Injectable()
export class HeroService {

	heroes: Hero[] = []; // cache of heroes

	constructor(protected _backend: BackendService) { }

	refresh() : Promise<Hero[]> { // refresh heroes w/ latest from the server
		this.heroes.length = 0;
		return <Promise<Hero[]>> this._backend.fetchAllHeroesAsync()
			.then(heroes => {
				this.heroes.push(...heroes);
				return this.heroes;
			})
			.catch(e => this._fetchFailed(e));
	}

	protected _fetchFailed(error:any) {
		console.error(error);
		return Promise.reject(error);
	}
}

// FOR DOCUMENTATION ONLY. NOT USED
interface IHeroService {
	heroes : Hero[];
	refresh() : Promise<Hero[]>;
}
