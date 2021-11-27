import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EstudianteModule } from './estudiante/estudiante.module';
// import { PublicadorOfertaModule} from './publicador-oferta/publicador-oferta.module';
import { VisitanteModule } from './visitante/visitante.module';
import {EmpresaModule} from './empresa/empresa.module';
import {HttpClientModule} from '@angular/common/http';
// import { InicioScreenComponent } from './empresa/screens/inicio-screen/inicio-screen.component';
// import { ConfiguracionComponent } from './empresa/screens/configuracion/configuracion.component';
// import { CrearofertaComponent } from './empresa/screens/crearoferta/crearoferta.component';

const MODULOS=[
  VisitanteModule,
  // PublicadorOfertaModule,
  EstudianteModule,
  EmpresaModule
];

@NgModule({
  declarations: [
    AppComponent,
    // InicioScreenComponent,
    // ConfiguracionComponent,
    // CrearofertaComponent
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

