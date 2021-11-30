import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { InicioScreenComponent } from './screens/inicio-screen/inicio-screen.component';
import { CrearOfertaScreenComponent } from './screens/crear-oferta-screen/crear-oferta-screen.component';
import { ConfiguracionScreenComponent } from './screens/configuracion-screen/configuracion-screen.component';
import { OfertaDetalleScreenComponent } from './screens/oferta-detalle-screen/oferta-detalle-screen.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { CardMiOfertaComponent } from './components/card-mi-oferta/card-mi-oferta.component';

@NgModule({
  declarations: [
    EmpresaComponent,
    InicioScreenComponent,
    CrearOfertaScreenComponent,
    ConfiguracionScreenComponent,
    OfertaDetalleScreenComponent,
    NavBarComponent,
    CardMiOfertaComponent,
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EmpresaModule { }
