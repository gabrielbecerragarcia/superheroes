import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeroesComponent } from './home-heroes.component';
import { RouterModule, Routes } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  { path: '', component: HomeHeroesComponent },
];

@NgModule({
  declarations: [
    HomeHeroesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
  ]
})
export class HomeHeroesModule { }
