import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicadorOfertaRoutingModule } from './publicador-oferta-routing.module';
import { PublicadorOfertaComponent } from './publicador-oferta.component';


@NgModule({
  declarations: [
    PublicadorOfertaComponent
  ],
  imports: [
    CommonModule,
    PublicadorOfertaRoutingModule
  ]
})
export class PublicadorOfertaModule { }
