import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './core/layouts/default-layout/default-layout.component';
import { ROUTES } from './shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
