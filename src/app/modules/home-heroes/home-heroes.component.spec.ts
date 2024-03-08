import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeroesComponent } from './home-heroes.component';

describe('HomeHeroesComponent', () => {
  let component: HomeHeroesComponent;
  let fixture: ComponentFixture<HomeHeroesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeHeroesComponent]
    });
    fixture = TestBed.createComponent(HomeHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
