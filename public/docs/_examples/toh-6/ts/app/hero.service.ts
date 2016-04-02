// #docplaster
// #docregion
import { Hero } from './hero';
import { Injectable } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';

@Injectable()
export class HeroService {
  
  private _heroesUrl = 'app/heroes';  // URL to web api
  
  constructor(private _http:Http){
  }
  
  //#docregion get-heroes
  getHeroes() {
    return this._http.get(this._heroesUrl).toPromise()
                     .then((res:Response) => res.json())
                     .then(res => res.data)
                     .catch(this.handleError);
  }
  //#enddocregion get-heroes
  
  getHero(id: number) {
    return this.getHeroes().then(
      heroes => heroes.filter((hero:Hero) => hero.id === id)[0]
    );
  }
  
  save(hero:Hero){
    if(hero.id){
      return this.put(hero);
    }
    else{
      return this.post(hero);
    }
  }
  
  delete(hero:Hero){
    //#docregion delete-hero
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let url = `${this._heroesUrl}/${hero.id}`;
    
    return this._http.delete(url,headers).toPromise()
               .catch(this.handleError);
    //#enddocregion delete-hero           
  }
  
  private post(hero:Hero){
    //#docregion post-hero
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this._http.post(this._heroesUrl, JSON.stringify(hero), {headers:headers}).toPromise()
               .catch(this.handleError);
    //#enddocregion post-hero           
  }
  
  private put(hero:Hero){
    //#docregion put-hero
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let url = `${this._heroesUrl}/${hero.id}`;
    
    return this._http.put(url, JSON.stringify(hero), {headers:headers}).toPromise()
               .catch(this.handleError);
    //#enddocregion put-hero          
  }
  
  //#docregion error-handler
  private handleError(error:any){
    console.log('An error occurred:' + error);
  }
  //#enddocregion error-handler 
}
// #enddocregion