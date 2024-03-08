import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormHeroesComponent } from './form-heroes.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperheroesService } from 'src/app/core/services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Superhero } from 'src/app/core/models/superhero.model';


describe('FormHeroesComponent', () => {
  let component: FormHeroesComponent;
  let fixture: ComponentFixture<FormHeroesComponent>;
  let mockSuperheroesService: any;
  let mockRouter: any;
  let mockSnackBar: any;

  beforeEach(async () => {
    mockSuperheroesService = jasmine.createSpyObj(['getSuperheroById', 'getSuperheroes', 'saveSuperheroes']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockSnackBar = jasmine.createSpyObj(['open']);

    await TestBed.configureTestingModule({
      declarations: [ FormHeroesComponent ],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
        { provide: SuperheroesService, useValue: mockSuperheroesService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSuperheroById when heroId is not "new"', () => {
    expect(mockSuperheroesService.getSuperheroById).toHaveBeenCalledWith('1');
  });

  it('should initialize form with correct values', () => {
    const superhero: Superhero = {
      id: '1',
      name: 'Superman',
      powerstats: { intelligence: '100', strength: '100', power: '100' },
      biography: { publisher: 'DC Comics', alignment: 'good' },
      appearance: { gender: 'Male' }
    };
    mockSuperheroesService.getSuperheroById.and.returnValue(of(superhero));
    component.ngOnInit();
    expect(component.heroForm.value).toEqual(superhero);
  });

  it('should update form values when hero data changes', () => {
    const superhero: Superhero = {
      id: '1',
      name: 'Superman',
      powerstats: { intelligence: '100', strength: '100', power: '100' },
      biography: { publisher: 'DC Comics', alignment: 'good' },
      appearance: { gender: 'Male' }
    };
    component.heroForm.setValue(superhero);
    superhero.name = 'Batman';
    component.heroForm.setValue(superhero);
    expect(component.heroForm.value.name).toEqual('Batman');
  });

  it('should display error message when getSuperheroById fails', () => {
    mockSuperheroesService.getSuperheroById.and.returnValue(throwError('Error'));
    component.ngOnInit();
    expect(mockSnackBar.open).toHaveBeenCalledWith('Error', 'Close', { duration: 2000, verticalPosition: 'top' });
  });
});
