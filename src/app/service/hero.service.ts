import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {
  private heroUrl = 'api/heroes';
  constructor(private messageService: MessageService,
              private http: HttpClient) { }
  getHeroes(): Observable<Hero[]> {
    // this.messageService.add('HeroService: fetched heroes');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }
  // getHero(id: number): Observable<Hero> {
   // this.messageService.add(`HeroService: fetched hero id=${id}`);
   // return of(HEROES.find(hero => hero.id === id));
  // }
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private log(message: string) {
    this.messageService.add('Heroservice' + message);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
