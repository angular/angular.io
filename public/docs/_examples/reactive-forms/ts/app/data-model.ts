export class Address {
      street = '';
      city   = '';
      state  = '';
      zip    = '';
}

export class Hero {
  name = '';
  addresses: Address[];
}

export const heroes: Hero[] = [

  { name: 'Whirlwind',
    addresses: [
      {street: '123 Main',  city: 'Anywhere', state: 'CA',  zip: '94801'},
      {street: '456 Maple', city: 'Somewhere', state: 'VA', zip: '23226'},
    ]
  },
  { name: 'Bombastic',
    addresses: [
      {street: '789 Elm',  city: 'Smallville', state: 'OH',  zip: '04501'},
    ]
  },
  { name: 'Magneta',
    addresses: [ ]
  },
];

export const states = ['CA', 'MD', 'OH', 'VA'];
