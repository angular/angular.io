// #docregion get-hero-method
  getHero(id: number) {
    return Promise.resolve(HEROES)
      .then((heroes: Hero[]) => { return heroes.filter((h) => {
        return h.id === id;
      })[0]});
    }
// #docregion get-hero-method