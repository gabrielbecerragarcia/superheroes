import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'prefix',
        loadChildren: () => import('../../modules/home-heroes/home-heroes.module').then(m => m.HomeHeroesModule),
        data: { title: 'Home heroes'}
    }
];
