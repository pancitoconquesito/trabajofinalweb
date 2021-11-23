import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitanteRoutingModule } from './visitante-routing.module';
import { VisitanteComponent } from './visitante.component';
import { NavbarVisitanteComponent } from './components/navbar-visitante/navbar-visitante.component';
import { LoginComponent } from './screens/login/login.component';

import {ReactiveFormsModule} from '@angular/forms';
import { RegistrarseComponent } from './screens/registrarse/registrarse.component';
import { RegEstudianteComponent } from './components/reg-estudiante/reg-estudiante.component';
import { RegPublicadorOfertaLaboralComponent } from './components/reg-publicador-oferta-laboral/reg-publicador-oferta-laboral.component';

@NgModule({
  declarations: [
    VisitanteComponent,
    NavbarVisitanteComponent,
    LoginComponent,
    RegistrarseComponent,
    RegEstudianteComponent,
    RegPublicadorOfertaLaboralComponent
  ],
  imports: [
    CommonModule,
    VisitanteRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    VisitanteComponent
  ]
})
export class VisitanteModule { }
