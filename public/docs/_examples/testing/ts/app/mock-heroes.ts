import {Hero} from './hero';

export var HEROES: Hero[] = [
	{
		"id": 11,
		"name": "Mr. Nice",
		"alterEgo": "Walter Meek",
		"power": "Empathy"
	},
	{
		"id": 12,
		"name": "Narco",
		"alterEgo": "Nancy Knight",
		"power": "Drowsiness"
	},
	{
		"id": 13,
		"name": "Bombasto",
		"alterEgo": "Bob LaRue",
		"power": "Hypersound"
	},
	{
		"id": 14,
		"name": "Celeritas",
		"alterEgo": "Larry Plodder",
		"power": "Super speed"
	},
	{
		"id": 15,
		"name": "Magneta",
		"alterEgo": "Julie Ohm",
		"power": "Master of electro-magnetic fields"
	},
	{
		"id": 16,
		"name": "Rubber Man",
		"alterEgo": "Jimmy Longfellow",
		"power": "Super flexible"
	},
	{
		"id": 17,
		"name": "Dynama",
		"alterEgo": "Shirley Knots",
		"power": "Incredible strength"
	},
	{
		"id": 18,
		"name": "Dr IQ",
		"alterEgo": "Chuck Overstreet",
		"power": "Really smart"
	},
	{
		"id": 19,
		"name": "Magma",
		"alterEgo": "Harvey Klue",
		"power": "Super hot"
	},
	{
		"id": 20,
		"name": "Tornado",
		"alterEgo": "Ted Baxter",
		"power": "Weather changer"
	},
	{
		"id": 21,
		"name": "eeny weenie",
		"alterEgo": "Ima Small",
		"power": "shrink to infinitesimal size"
	}
	].map(h => Hero.clone(h));