import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { Superhero } from 'src/app/core/models/superhero.model';
import { SuperheroesService } from 'src/app/core/services/heroes.service';
import { HomeHeroesComponent } from './home-heroes.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeHeroesComponent', () => {
  let component: HomeHeroesComponent;
  let fixture: ComponentFixture<HomeHeroesComponent>;
  let mockSuperheroesService: jasmine.SpyObj<SuperheroesService>;
  let superheroes: Superhero[];

  beforeEach(async () => {
    superheroes = [
      { id: '1', name: 'Superman',
      "powerstats": {
        "intelligence": "38",
        "strength": "100",
        "power": "24"
      },
      "biography": {
        "publisher": "Marvel Comics",
        "alignment": "good"
      },
      "appearance": {
        "gender": "Male"
      } },
      { id: '2', name: 'Batman',
      "powerstats": {
        "intelligence": "45",
        "strength": "97",
        "power": "50"
      },
      "biography": {
        "publisher": "Image Comics",
        "alignment": "bad"
      },
      "appearance": {
        "gender": "Female"
      }}
    ];

    mockSuperheroesService = jasmine.createSpyObj(['getSuperheroes', 'deleteHero']);
    mockSuperheroesService.getSuperheroes.and.returnValue(of(superheroes));

    await TestBed.configureTestingModule({
      declarations: [ HomeHeroesComponent ],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: SuperheroesService, useValue: mockSuperheroesService },
        { provide: MatDialog, useValue: {} },
        { provide: MatSnackBar, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSuperheroes service on getSuperheroes', () => {
    component.getSuperheroes();
    expect(mockSuperheroesService.getSuperheroes).toHaveBeenCalled();
  });

  it('should set superheroes correctly from the service', () => {
    component.getSuperheroes();
    expect(component.superheroes.length).toBe(2);
    expect(component.filteredSuperheroes.length).toBe(2);
  });

  it('should update superheroes and filteredSuperheroes when getSuperheroes is called', () => {
    const superheroes: Superhero[] = [{ id: '1', name: 'Superman',
    "powerstats": {
      "intelligence": "38",
      "strength": "100",
      "power": "24"
    },
    "biography": {
      "publisher": "Marvel Comics",
      "alignment": "good"
    },
    "appearance": {
      "gender": "Male"
    } }];
    mockSuperheroesService.getSuperheroes.and.returnValue(of(superheroes));
    component.getSuperheroes();
    expect(component.superheroes).toEqual(superheroes);
    expect(component.filteredSuperheroes).toEqual(superheroes);
  });

  it('should update filteredSuperheroes when search is called', () => {
    const superheroes: Superhero[] = [{ id: '1', name: 'Superman',
    "powerstats": {
      "intelligence": "38",
      "strength": "100",
      "power": "24"
    },
    "biography": {
      "publisher": "Marvel Comics",
      "alignment": "good"
    },
    "appearance": {
      "gender": "Male"
    } }];
    component.superheroes = superheroes;
    component.search({ target: { value: 'Superman' } } as any);
    expect(component.filteredSuperheroes).toEqual(superheroes);
  });

});
