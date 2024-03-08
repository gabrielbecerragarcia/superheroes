import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeroesComponent } from './home-heroes.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogModule } from 'src/app/shared/routes/components/confirmation-dialog/confirmation-dialog.module';

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
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ConfirmationDialogModule
  ]
})
export class HomeHeroesModule { }
