import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';

//Module Princupal - Parte 4

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },

];

// Se agregan los enable y hash y dashboard
@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, useHash: true}), DashboardRoutingModule], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
