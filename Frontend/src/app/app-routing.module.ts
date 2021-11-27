import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {VisitanteComponent} from './visitante/visitante.component';

const routes: Routes = [
  {path:'', redirectTo:"/visitante", pathMatch:'full'},
  {path:'visitante', component:VisitanteComponent},
  {path:'estudiante', loadChildren: ()=> import('./estudiante/estudiante.module').then(m => m.EstudianteModule)},
  {path:'empresa', loadChildren: ()=> import('./empresa/empresa.module').then(m => m.EmpresaModule)},
  {path:'admin', loadChildren: ()=> import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

