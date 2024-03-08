import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Superhero } from '../models/superhero.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {
  private localStorageKey = 'superheroes';
  private superheroesUrl = 'assets/superheroes.json'; // URL del archivo JSON de superhéroes (mock) Información de los superhéroes obtenida de la API https://superheroapi.com/

  constructor(
    private http: HttpClient
  ) {
      const item = localStorage.getItem(this.localStorageKey);
      if (!item || item.length === 0) {
        this.initializeLocalStorage();
      }
    }

  /**
   * Function to initialize LocalStorage with superheroes
   */
  initializeLocalStorage(): void {
    this.http.get<Superhero[]>(this.superheroesUrl).subscribe({
      next: (superheroes: Superhero[]) => {
        localStorage.setItem(this.localStorageKey, JSON.stringify(superheroes));
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error initializing LocalStorage:', error);
      }
    });
  }

  /**
   *  GET superheroes from the server
   */
  getSuperheroes(): Observable<Superhero[]> {
    const superheroesJson = localStorage.getItem(this.localStorageKey);

    return of(superheroesJson ? JSON.parse(superheroesJson) : []);
  }

  /**
   * Get superhero by ID
   */
  getSuperheroById(id: string): Observable<Superhero | undefined> {
    return this.getSuperheroes().pipe(
      map(superheroes => superheroes.find(hero => hero.id === id))
    );
  }

  /**
   * Function to delete a superhero
   */
  deleteHero(heroId: string): Observable<Superhero[]> {
    return this.getSuperheroes().pipe(
      map(superheroes => {
        const updatedSuperheroes = superheroes.filter(hero => hero.id !== heroId);
        this.saveSuperheroes(updatedSuperheroes);
        return updatedSuperheroes;
      }),
      catchError(this.handleError('deleteHero', []))
    )
  }

  /**
   * Function to save a superhero
   */
  saveSuperheroes(superheroes: Superhero[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(superheroes));
  }

  /**
   * Function to handle Http operation that failed
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
