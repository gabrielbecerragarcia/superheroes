import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Superhero } from '../models/superhero.model';

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
}
