// #docregion
/* avoid */

export class HeroListComponent implements OnInit {
  heroes: Hero[];
  constructor(private http: Http) {}
  getHeros() {
    this.heroes = [];
    this.http.get(heroesUrl)
      .map((response: Response) => <Hero[]>response.json().data)
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide())
      .subscribe(heroes => this.heroes = heroes);
  }
  ngOnInit() {
    this.getHeros();
  }
}
