import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  loading: boolean = true;

  constructor(
    private superheroesService: SuperheroesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }

  /**
   * NgOnInit get all superheroes when initializing component
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.getSuperheroes();
      this.loading = false;
    }, 2000);
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
            this.snackBar.open('Hero deleted successfully', 'Close', {
              duration: 4000,
              verticalPosition: 'top'
            });
          });
      }
    });
  }
}
