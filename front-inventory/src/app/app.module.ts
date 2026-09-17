import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


//Primero se crea el modulo y despues el componente
// ng g m modules/shared   //Para crear modulos
// ng g c modules/shared/components/sidenav  //se crea el componente

// Para material de angular animaciones   pagweb: material.angular.io
// ng add @angular/material  //Para agregar las librerias
// ng g m modules/shared/material --flat   // flat es para que solo cree el archivo cundo so modulos