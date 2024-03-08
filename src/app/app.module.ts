// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeHeroesComponent } from './modules/home-heroes/home-heroes.component';

const routes: Routes = [
  { path: '', component: HomeHeroesComponent },
  // otras rutas aquí
];

@NgModule({
  declarations: [
    AppComponent,
    HomeHeroesComponent,
    // otros componentes aquí
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
