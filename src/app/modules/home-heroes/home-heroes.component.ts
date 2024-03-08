import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Superhero } from 'src/app/core/models/superhero.model';
import { SuperheroesService } from 'src/app/core/services/heroes.service';

@Component({
  selector: 'app-home-heroes',
  templateUrl: './home-heroes.component.html',
  styleUrls: ['./home-heroes.component.css']
})
export class HomeHeroesComponent {
  superheroes: Superhero[] = [];

  constructor(private superheroesService: SuperheroesService) { }

  ngOnInit(): void {
    this.getSuperheroes();
  }

  getSuperheroes(): void {
    this.superheroesService.getSuperheroes()
      .subscribe(superheroes => {
        this.superheroes = superheroes;
      });
  }
}
