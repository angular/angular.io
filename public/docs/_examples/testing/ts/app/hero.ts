// #docregion
let nextId = 30;

export class Hero {
	constructor(
		public id?: number,
		public name?: string,
		public power?: string,
		public alterEgo?: string
	) {
		this.id = id || nextId++;
	}

	clone() { return Hero.clone(this); }

	static clone = (h:any) => new Hero(h.id, h.name, h.alterEgo, h.power);

	static setNextId(next:number) { nextId = next; }
}
