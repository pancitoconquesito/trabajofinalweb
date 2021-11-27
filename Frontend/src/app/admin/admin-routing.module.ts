import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminModule } from './admin.module';
import { CrearCursoScreenComponent } from './screens/crear-curso-screen/crear-curso-screen.component';
import { CrearModuloScreenComponent } from './screens/crear-modulo-screen/crear-modulo-screen.component';
import { CursosScreenComponent } from './screens/cursos-screen/cursos-screen.component';

const routes: Routes = [
  {path:'', component:AdminComponent
    ,children:[
      {path:'', redirectTo:"inicio", pathMatch:'full'},
      {path:'inicio', component:CursosScreenComponent},
        {path:'crear_curso', component:CrearCursoScreenComponent},
        {path:'curso-actual/:idCurso', component:CrearModuloScreenComponent}
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
