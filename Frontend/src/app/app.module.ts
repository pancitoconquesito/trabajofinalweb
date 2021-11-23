import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EstudianteModule } from './estudiante/estudiante.module';
import { PublicadorOfertaModule} from './publicador-oferta/publicador-oferta.module';
import { VisitanteModule } from './visitante/visitante.module';
import {HttpClientModule} from '@angular/common/http';

const MODULOS=[
  VisitanteModule,
  PublicadorOfertaModule,
  EstudianteModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ...MODULOS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

