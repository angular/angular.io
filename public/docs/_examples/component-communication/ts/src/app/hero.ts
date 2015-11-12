export class Hero {
  constructor(
    public id: number,
    public name: string) { }

    /** Test heroes for demo purposes */
    static get heroes() {
      return [
        new Hero(11, "Mr. Nice"),
        new Hero(12, "Narco"),
        new Hero(13, "Bombasto"),
        new Hero(14, "Celeritas"),
        new Hero(15, "Magneta"),
        new Hero(16, "RubberMan")
      ];
    }
}

// Other heroes:
// {id: 17, name: "Dynama"}
// {id: 18, name: "Dr IQ"}
// {id: 19, name: "Magma"}
// {id: 20, name: "Tornado"}
