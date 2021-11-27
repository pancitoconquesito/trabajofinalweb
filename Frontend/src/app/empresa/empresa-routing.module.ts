import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa.component';
import { ConfiguracionScreenComponent } from './screens/configuracion-screen/configuracion-screen.component';
import { CrearOfertaScreenComponent } from './screens/crear-oferta-screen/crear-oferta-screen.component';
import { InicioScreenComponent } from './screens/inicio-screen/inicio-screen.component';

const routes: Routes = [

  {path:'', component:EmpresaComponent
    ,children:[
        {path:'', redirectTo:"inicio", pathMatch:'full'},
        {path:'inicio', component:InicioScreenComponent},
        {path:'configuracion', component:ConfiguracionScreenComponent},
        {path:'crearoferta', component:CrearOfertaScreenComponent}
      ]
    }

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
