import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Superhero } from 'src/app/core/models/superhero.model';
import { SuperheroesService } from 'src/app/core/services/heroes.service';
import { ConfirmationDialogComponent } from 'src/app/shared/routes/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-home-heroes',
  templateUrl: './home-heroes.component.html',
  styleUrls: ['./home-heroes.component.css']
})
export class HomeHeroesComponent {
  superheroes: Superhero[] = [];
  filteredSuperheroes: Superhero[] = [];

  constructor(
    private superheroesService: SuperheroesService,
    private dialog: MatDialog
    ) { }

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
  search(term: Event): void {
    const value = (term.target as HTMLInputElement).value;
    this.filteredSuperheroes = this.superheroes.filter(hero =>
      hero.name.toLowerCase().includes(value.toLowerCase())
    );

  }

  editHero(hero: any) {
  }

  /**
   *  Function to delete a superhero
   */
  deleteHero(heroId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.superheroesService.deleteHero(heroId)
          .subscribe(updatedSuperheroes => {
            this.superheroes = updatedSuperheroes;
            this.filteredSuperheroes = updatedSuperheroes;
          });
      }
    });
  }
}
