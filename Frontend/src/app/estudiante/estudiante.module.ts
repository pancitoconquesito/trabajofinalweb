import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { EstudianteComponent } from './estudiante.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { InicioScreensComponent } from './screens/inicio-screens/inicio-screens.component';
import { CursosScreenComponent } from './screens/cursos-screen/cursos-screen.component';
import { OfertasScreenComponent } from './screens/ofertas-screen/ofertas-screen.component';
import { OfertaActualScreenComponent } from './screens/oferta-actual-screen/oferta-actual-screen.component';
import { CursoActualScreenComponent } from './screens/curso-actual-screen/curso-actual-screen.component';
import { CertificadosScreenComponent } from './screens/certificados-screen/certificados-screen.component';
import { CardOfertaComponent } from './components/card-oferta/card-oferta.component';
import { CardCursoComponent } from './components/card-curso/card-curso.component';
import { CantModulosCursoPipe } from '../pipes/cantModulosCurso/cant-modulos-curso.pipe';
import { MinutosParseHrMinPipe } from '../pipes/minutosParseHrMin/minutos-parse-hr-min.pipe';
import { FormsModule } from '@angular/forms';
import { FiltroCursosPipe } from '../pipes/filtroCursos/filtro-cursos.pipe';
import {FiltroOfertaPipe} from '../pipes/filtro-oferta/filtro-oferta.pipe';
import { CursoDescripcionScreenComponent } from './screens/curso-descripcion-screen/curso-descripcion-screen.component';
import { CardModuloDescripcionComponent } from './components/card-modulo-descripcion/card-modulo-descripcion.component';
import { ConfiguracionComponent } from './screens/configuracion/configuracion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardPostulacionComponent } from './components/card-postulacion/card-postulacion.component';

const COMPONENTES=[
    EstudianteComponent,
    NavbarComponent,
    InicioScreensComponent,
    CursosScreenComponent,
    OfertasScreenComponent,
    OfertaActualScreenComponent,
    CursoActualScreenComponent,
    CertificadosScreenComponent,
    CardOfertaComponent,
    CardCursoComponent,
    CursoDescripcionScreenComponent,
    CardModuloDescripcionComponent,
    ConfiguracionComponent
];

@NgModule({
  declarations: [
    ...COMPONENTES,
    CantModulosCursoPipe,
    MinutosParseHrMinPipe,
    FiltroCursosPipe,
    FiltroOfertaPipe,
    CardPostulacionComponent
    
    
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EstudianteModule { }
