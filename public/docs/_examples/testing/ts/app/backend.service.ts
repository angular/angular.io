import {Hero} from './hero';
import {HEROES} from './mock-heroes';

let delay = 1000; // ms delay in return of data

export class BackendService {

	fetchAllHeroesAsync(): Promise<Hero[]> {
		return new Promise((resolve, reject) => {
			// simulate latency by resolving promise after a delay
			setTimeout(() => resolve(HEROES.map(h => h.clone())), delay)
		})
	}
}
