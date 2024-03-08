import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperheroesService } from 'src/app/core/services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-heroes',
  templateUrl: './form-heroes.component.html',
  styleUrls: ['./form-heroes.component.css']
})
export class FormHeroesComponent {
  isNewHero: boolean = false;
  heroId: string = '';
  heroForm: FormGroup = {} as FormGroup;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private superheroService: SuperheroesService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  /**
   * ngOnInit get all superheroes when initializing component
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.heroId = params['id'];

      if (this.heroId === 'new') {
        this.isNewHero = true;
      } else if (!isNaN(+this.heroId)) {
        this.isNewHero = false;
      } else {
        this.isNewHero = true;
        console.error('ID hero no valid:', this.heroId);
      }

      this.initializingForm();

      if (!this.isNewHero) {
        this.getHeroInfo();
      }

      setTimeout(() => {
        this.loading = false;
      }, 2000);

    });
  }

  /**
   * Function to initialize the form
   */
  initializingForm(): void {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      powerstats: this.fb.group({
        intelligence: [''],
        strength: ['', Validators.required],
        power: ['']
      }),
      biography: this.fb.group({
        publisher: ['', Validators.required],
        alignment: ['']
      }),
      appearance: this.fb.group({
        gender: [''],
      })
    });
  }

  /**
   * Function to get the hero information
   */
  getHeroInfo(): void {
    this.superheroService.getSuperheroById(this.heroId).subscribe(hero => {
      if (hero) {
        this.heroForm.patchValue({
          name: hero.name,
          id: hero.id,
          powerstats: {
            intelligence: hero.powerstats.intelligence,
            strength: hero.powerstats.strength,
            power: hero.powerstats.power
          },
          biography: {
            publisher: hero.biography.publisher,
            alignment: hero.biography.alignment
          },
          appearance: {
            gender: hero.appearance.gender,
          }
        });
      } else {
        console.error('ID hero not found:', this.heroId);
        this.isNewHero = true;
      }
    }, error => {
      this.snackBar.open('Error', 'Close', {
        duration: 2000,
        verticalPosition: 'top'
      });
    });
  }

  /**
   * Function to submit the form
   */
  onSubmit(): void {
    if (this.heroForm.valid) {
      const formData = this.heroForm.value;
      let snackBarMessage = '';

      this.superheroService.getSuperheroes().subscribe(superheroes => {
        if (this.isNewHero) {
          superheroes.push(formData);
          snackBarMessage = 'Hero created successfully';
        } else {
          const index = superheroes.findIndex(hero => hero.id === this.heroId);
          if (index !== -1) {
            superheroes[index] = formData;
            snackBarMessage = 'Hero edited successfully';
          }
        }

        this.superheroService.saveSuperheroes(superheroes);
        this.router.navigate(['/']);

        if (snackBarMessage) {
          this.snackBar.open(snackBarMessage, 'Close', {
            duration: 4000,
            verticalPosition: 'top'
          });
        }
      });
    }
  }

  /**
   * Function to go back
   */
  goBack(): void {
    window.history.back();
  }
}
