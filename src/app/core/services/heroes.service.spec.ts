import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SuperheroesService } from './heroes.service';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Añade esto
      providers: [SuperheroesService]
    });
    service = TestBed.inject(SuperheroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
