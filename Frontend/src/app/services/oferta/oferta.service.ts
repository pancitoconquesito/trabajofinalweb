import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CuentaEmpresa } from 'src/app/models/cuenta_empresa.model';
import { dv_CardOferta } from 'src/app/models/dv_card_oferta.model';
import { dv_OfertaActual } from 'src/app/models/dv_oferta_actual.model';
import { nub_OfertaEmpresa } from 'src/app/models/nub_oferta_empresa_model';
import { OfertaLaboral } from 'src/app/models/oferta_laboral.model';
import { environment } from 'src/environments/environment';



import {listaEmpresas_, listaNub_} from '../../FAKE_BD';//FIXME

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  listaEmpresas_=listaEmpresas_;

  constructor(private httpcliente:HttpClient) { }


  public get_ARRAY_DvOferta_ARRAYnubOfertaEmpresa():Observable<any>{

    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getlistadvoferta');
    // let listaDvRetorno:Array<dv_CardOferta>=[];

    // let id_nubOfertaEmpresa:number;
    // let titulo:string;
    // let nombreEmpresa:string
    // let pais:string;
    // let ciudad:string;
    // let fechaPublicacion:string;
    // let imgEmpresa:string;
    // listaNubOfertaEmpresa.forEach((valor, índice) => {
    //   //obtener los campos necesarios
    //   id_nubOfertaEmpresa=valor._idNub;
    //   //bsucar empresa de listaEmpresas_
    //   let empresa:any=this.listaEmpresas_.find(obj=>obj._id==valor._idEmpresa);
    //   nombreEmpresa=empresa?.nombreEmpresa;
    //   //buscar la oferta, agregar datos necesarios
    //   let oferta:any= empresa?.ofertasPublicadas.find((obj:any)=>obj._id==valor._idOferta);
    //   titulo=oferta?.titulo;
    //   pais=oferta?.pais;
    //   ciudad=oferta?.ciudad;
    //   fechaPublicacion=oferta?.fechaPublicacion;
    //   imgEmpresa=empresa?.imgEmpresa;

    //   //crear elemento de lista y agregar 
    //   let cardOferta:dv_CardOferta={
    //     _id_nubOfertaEmpresa:id_nubOfertaEmpresa,
    //     titulo:titulo,
    //     nombreEmpresa:nombreEmpresa,
    //     pais:pais,
    //     ciudad:ciudad,
    //     fechaPublicacion:fechaPublicacion,
    //     imgEmpresa:imgEmpresa
    //   };
    //   listaDvRetorno.push(cardOferta);
    // });
    // return listaDvRetorno;
  }
  // public get_ARRAY_DvOferta_ARRAYnubOfertaEmpresa(listaNubOfertaEmpresa:Array<nub_OfertaEmpresa>):Array<dv_CardOferta>{
  //   let listaDvRetorno:Array<dv_CardOferta>=[];

  //   let id_nubOfertaEmpresa:number;
  //   let titulo:string;
  //   let nombreEmpresa:string
  //   let pais:string;
  //   let ciudad:string;
  //   let fechaPublicacion:string;
  //   let imgEmpresa:string;
  //   listaNubOfertaEmpresa.forEach((valor, índice) => {
  //     //obtener los campos necesarios
  //     id_nubOfertaEmpresa=valor._idNub;
  //     //bsucar empresa de listaEmpresas_
  //     let empresa:any=this.listaEmpresas_.find(obj=>obj._id==valor._idEmpresa);
  //     nombreEmpresa=empresa?.nombreEmpresa;
  //     //buscar la oferta, agregar datos necesarios
  //     let oferta:any= empresa?.ofertasPublicadas.find((obj:any)=>obj._id==valor._idOferta);
  //     titulo=oferta?.titulo;
  //     pais=oferta?.pais;
  //     ciudad=oferta?.ciudad;
  //     fechaPublicacion=oferta?.fechaPublicacion;
  //     imgEmpresa=empresa?.imgEmpresa;

  //     //crear elemento de lista y agregar 
  //     let cardOferta:dv_CardOferta={
  //       _id_nubOfertaEmpresa:id_nubOfertaEmpresa,
  //       titulo:titulo,
  //       nombreEmpresa:nombreEmpresa,
  //       pais:pais,
  //       ciudad:ciudad,
  //       fechaPublicacion:fechaPublicacion,
  //       imgEmpresa:imgEmpresa
  //     };
  //     listaDvRetorno.push(cardOferta);
  //   });
  //   return listaDvRetorno;
  // }











  public getNubOfertaEmpresa():Observable<any>{
    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getsislistaofertas');
  }
  // public getNubOfertaEmpresa(inicio:number, final:number):Array<nub_OfertaEmpresa>{
  //   // consigo la lista FIXME
  //   if(final == null)
  //     return listaNub_.slice(inicio);
  //   return listaNub_.slice(inicio,final);
  // }
  public getActualInfoOferta(idNubOfertaEmpresa:number):CuentaEmpresa{

    //obtener nub
    let nubOF:any=listaNub_.find(obj=>obj._idNub ==idNubOfertaEmpresa);
    //obtener empresa
    let empresa=this.listaEmpresas_.find(obj=>obj._id ==nubOF._idEmpresa);
    //obtener oferta
    let ofertas=empresa?.ofertasPublicadas.slice();
    let ofertaActual:any=ofertas?.find(obj=>obj._id ==nubOF._idOferta);

    let empresaRetorno:any = JSON.parse( JSON.stringify( empresa ) );
    empresaRetorno?.ofertasPublicadas.splice(0,empresa?.ofertasPublicadas.length);
    empresaRetorno?.ofertasPublicadas.push(ofertaActual);

    let dataEmpresaOferta:CuentaEmpresa=JSON.parse( JSON.stringify( empresaRetorno ) );
    return dataEmpresaOferta;

  }
}

