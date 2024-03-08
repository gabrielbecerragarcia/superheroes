import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Superhero } from '../models/superhero.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {
  private superheroesUrl = 'assets/superheroes.json'; // URL del archivo JSON de superhéroes (mock) Información de los superhéroes obtenida de la API https://superheroapi.com/

  constructor(
    private http: HttpClient
  ) { }

  /**
   *  GET superheroes from the server
   */
  getSuperheroes(): Observable<Superhero[]> {
    return this.http.get<Superhero[]>(this.superheroesUrl);
  }

  deleteHero(heroId: string): Observable<Superhero[]> {
    return this.getSuperheroes().pipe(
      map(superheroes => superheroes.filter(hero => hero.id !== heroId)),
      tap(updatedSuperheroes => this.saveSuperheroes(updatedSuperheroes)),
      catchError(this.handleError('deleteHero', []))
    );
  }

  private saveSuperheroes(superheroes: Superhero[]): void {
    // Guardar la lista actualizada de superhéroes en el mock (podrías implementar una lógica de guardado real aquí)
    console.log('Superheroes actualizados:', superheroes);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
