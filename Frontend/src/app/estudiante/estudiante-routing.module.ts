import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {InicioComponent} from './screens/inicio/inicio.component';

// import {InicioScreensComponent} from './screens/inicio-screens/inicio-screens.component';
// import {CursosScreenComponent} from './screens/cursos-screen/cursos-screen.component';
// import {OfertasScreenComponent} from './screens/ofertas-screen/ofertas-screen.component';
// import { OfertaActualScreenComponent } from './screens/oferta-actual-screen/oferta-actual-screen.component';

import {OfertaActualScreenComponent} from './screens/oferta-actual-screen/oferta-actual-screen.component';
import {CursoActualScreenComponent} from './screens/curso-actual-screen/curso-actual-screen.component';
const routes: Routes = [
  // {path:'inicioEstudiante/cursos/curso-actual/:id', component:CursoActualScreenComponent}
  // {path:'inicioEstudiante/cursos/:nombre/:id', component:CursoActualScreenComponent},
  // {path:'inicioEstudiante/ofertas/:nombre/:idNUBOfertaEmpresa', component:OfertaActualScreenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }
