import { Pipe, PipeTransform } from '@angular/core';
import { dv_CardOferta } from 'src/app/models/dv_card_oferta.model';
import { OfertaLaboral } from 'src/app/models/oferta_laboral.model';
import { OfertaService } from 'src/app/services/oferta/oferta.service';

@Pipe({
  name: 'filtroOferta'
})
export class FiltroOfertaPipe implements PipeTransform {

  transform(listaOfertas: Array<OfertaLaboral> , texto:string, nacional:boolean, teletrabajo:boolean, completo:boolean, parcial:boolean, horas:boolean, nacionalidad:string):Array<OfertaLaboral> {

    let listaOfertasRetorno:Array<OfertaLaboral>=[];
    //filtro texto
    if(texto.length>0){
      for(let oferta of listaOfertas)
        if(oferta.titulo.toUpperCase().indexOf(texto.toUpperCase()) > -1) listaOfertasRetorno.push(oferta);
    }else 
    listaOfertasRetorno=listaOfertas.slice();

    //ubicacion
    // let checkUbicacion:boolean=(nacional&&internacional&&teletrabajo)||(!nacional&&!internacional&&!teletrabajo);
    // if(!checkUbicacion){
      if(nacional)listaOfertasRetorno=listaOfertasRetorno.filter(x => x.pais===nacionalidad);
      if(teletrabajo)listaOfertasRetorno=listaOfertasRetorno.filter(x => x.teletrabajo ==true);
    // }
    
    //jornada
    let checkJornada:boolean=(completo&&parcial&&horas)||(!completo&&!parcial&&!horas);
    if(!checkJornada){
      if(!completo)listaOfertasRetorno=listaOfertasRetorno.filter(x => x.tipoJornada!=='Tiempo completo');
      if(!parcial)listaOfertasRetorno=listaOfertasRetorno.filter(x => x.tipoJornada!=='Tiempo parcial');
      if(!horas)listaOfertasRetorno=listaOfertasRetorno.filter(x => x.tipoJornada!=='Por horas');
    }
    return listaOfertasRetorno;
  }

}
