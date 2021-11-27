import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin.module';
import { CrearCursoScreenComponent } from './screens/crear-curso-screen/crear-curso-screen.component';
import { CrearModuloScreenComponent } from './screens/crear-modulo-screen/crear-modulo-screen.component';
import { CursosScreenComponent } from './screens/cursos-screen/cursos-screen.component';

const routes: Routes = [
  {path:'', component:AdminModule
    ,children:[
      {path:'', redirectTo:"inicio", pathMatch:'full'},
      {path:'inicio', component:CursosScreenComponent},
        {path:'crear_curso', component:CrearCursoScreenComponent},
        {path:'crear_modulo', component:CrearModuloScreenComponent}
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
