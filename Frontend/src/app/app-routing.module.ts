import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {VisitanteComponent} from './visitante/visitante.component';

const routes: Routes = [
  {path:'', redirectTo:"/visitante", pathMatch:'full'},
  {path:'visitante', component:VisitanteComponent},
  // {path:'visitante', loadChildren: ()=> import('./visitante/visitante.module').then(m => m.VisitanteModule)},
  {path:'estudiante', loadChildren: ()=> import('./estudiante/estudiante.module').then(m => m.EstudianteModule)},
  {path:'publicador', loadChildren: ()=> import('./publicador-oferta/publicador-oferta.module').then(m => m.PublicadorOfertaModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

