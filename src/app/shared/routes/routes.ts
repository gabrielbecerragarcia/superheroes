import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'prefix',
        loadChildren: () => import('../../modules/home-heroes/home-heroes.module').then(m => m.HomeHeroesModule),
        data: { title: 'Home heroes'}
    },
    {
      path: 'form/:id',
      pathMatch: 'prefix',
      loadChildren: () => import('../../modules/form-heroes/form-heroes.module').then(m => m.FormHeroesModule),
      data: { title: 'Edit hero' }
  }
];
