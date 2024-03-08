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
  filteredSuperheroes: Superhero[] = [];

  constructor(private superheroesService: SuperheroesService) { }

  /**
   * ngOnInit get all superheroes when initializing component
   */
  ngOnInit(): void {
    this.getSuperheroes();
  }

  /**
   * Call the service to get all the superheroes
   */
  getSuperheroes(): void {
    this.superheroesService.getSuperheroes()
      .subscribe(data => {
        this.superheroes = data;
        this.filteredSuperheroes = data;
      });
  }

  /**
   * Filter superheroes based on search term
   */
  search(term: any): void {
    this.filteredSuperheroes = this.superheroes.filter(hero =>
      hero.name.toLowerCase().includes(term.target.value.toLowerCase())
    );
  }
}
