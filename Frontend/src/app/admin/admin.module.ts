import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CrearCursoScreenComponent } from './screens/crear-curso-screen/crear-curso-screen.component';
import { CrearModuloScreenComponent } from './screens/crear-modulo-screen/crear-modulo-screen.component';
import { CursosScreenComponent } from './screens/cursos-screen/cursos-screen.component';
import {  NavBarComponent} from './components/nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModuloComponent } from './components/card-modulo/card-modulo.component';
import { CardCursoComponent } from './components/card-curso/card-curso.component';


@NgModule({
  declarations: [
    AdminComponent,
    CrearCursoScreenComponent,
    CrearModuloScreenComponent,
    CursosScreenComponent,
    NavBarComponent,
    CardModuloComponent,
    CardCursoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
