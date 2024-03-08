import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeroesComponent } from './home-heroes.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

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
    MatInputModule
  ]
})
export class HomeHeroesModule { }
