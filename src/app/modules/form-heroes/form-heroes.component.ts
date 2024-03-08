import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperheroesService } from 'src/app/core/services/heroes.service';
import { Superhero } from 'src/app/core/models/superhero.model';

@Component({
  selector: 'app-form-heroes',
  templateUrl: './form-heroes.component.html',
  styleUrls: ['./form-heroes.component.css']
})
export class FormHeroesComponent {
  isNewHero: boolean = true;
  heroId: string = '';
  heroForm: FormGroup = {} as FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private superheroService: SuperheroesService
    ) {
    this.route.params.subscribe(params => {
      this.heroId = params['id']; // Obtener el ID del héroe de la URL

      if (this.heroId === 'new') {
        this.isNewHero = true;
      } else if (!isNaN(+this.heroId)) {
        this.isNewHero = false;
      } else {
        this.isNewHero = true;
        console.error('ID de héroe no válido:', this.heroId);
      }
    });
  }

  /**
   * ngOnInit get all superheroes when initializing component
   */
  ngOnInit() {
    this.initializingForm();
    if (!this.isNewHero) {
      this.getHeroInfo();
    }
  }

  /**
   * Function to initialize the form
   */
  initializingForm(): void {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      response: ['', Validators.required],
      powerstats: this.fb.group({
        intelligence: [''],
        strength: ['', Validators.required],
        power: ['']
      }),
      biography: this.fb.group({
        publisher: ['', Validators.required],
        alignment: ['', Validators.required]
      }),
      appearance: this.fb.group({
        gender: ['', Validators.required],
        race: ['']
      })
    });
  }

  /**
   * Function to get the hero information
   */
  getHeroInfo(): void {
    this.superheroService.getSuperheroById(this.heroId).subscribe(hero => {
      console.log('Heroe:', hero);
      if (hero) {
        this.heroForm.patchValue({
          name: hero.name,
          id: hero.id,
          response: hero.response,
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
            race: hero.appearance.race
          }
        });
      } else {
        console.error('ID de héroe no encontrado:', this.heroId);
        this.isNewHero = true;
      }
    });
  }

  onSubmit() {
    if (this.heroForm.valid) {
      if (this.isNewHero) {
        // Lógica para crear un nuevo héroe
      } else {
        // Lógica para editar el héroe existente
      }
    } else {
      // El formulario no es válido, muestra mensajes de error o realiza otras acciones
    }
  }
}
