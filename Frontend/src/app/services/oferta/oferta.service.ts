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
  }

  public getNubOfertaEmpresa():Observable<any>{
    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getsislistaofertas');
  }

  public getInfoOferta(sis_listaofertas:number):Observable<any>{
    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getinfooferta/'+sis_listaofertas);
  }
  
  public getInfoEmpresa(_id:number):Observable<any>{
    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getinfoempresa/'+_id);
  }
  public getNub(_idempresa:number, _idoferta:number):Observable<any>{
    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getnub/'+_idempresa+'/'+_idoferta);
  }
  




}

