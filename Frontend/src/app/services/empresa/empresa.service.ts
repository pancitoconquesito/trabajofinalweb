import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import{HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private httpcliente:HttpClient) { }
  HttpUploadOptions = {
		headers: new HttpHeaders({ Accept: 'application/json' }),
	};
  public isEmpresaDisponible(correo:string):Observable<any>{
    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/isEmpresaDisponible/'+correo); 
  }
  public getOfertasEmpresa(_id:number):Observable<any>{
    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getOfertasEmpresa/'+_id); 
  }
  public addEmpresa(nombreEmpresa:string, correo:string, password:string, telefono:number, descripcionEmpresa:string, imgEmpresa:string):Observable<any>{
    let obj:any={
      nombreEmpresa:nombreEmpresa,
      correo:correo,
      password:password,
      telefono:telefono,
      descripcionEmpresa:descripcionEmpresa,
      imgEmpresa:imgEmpresa
    }
    return this.httpcliente.post(environment.hostname+":"+environment.puerto+'/addEmpresa', obj, this.HttpUploadOptions); 
  }
  public saveLS_empresa(_id:number){
    // console.log(_id);
    localStorage.setItem("ls_empresa", String(_id));
  }
  public getLS_empresa(){
    return localStorage.getItem("ls_empresa");
  }
  public addOferta(titulo:string, descripcion:string, pais:string, ciudad:string, fecha:string, tipojornada:string, email:string, telefono:number, fk_empresa:number, teletrabajo:boolean, sueldo:number):Observable<any>{
    let obj:any={
      titulo:titulo,
      descripcion:descripcion,
      pais:pais,
      ciudad:ciudad,
      fecha:fecha,
      tipojornada:tipojornada,
      email:email,
      telefono:telefono,
      fk_empresa:fk_empresa,
      teletrabajo:teletrabajo,
      sueldo:sueldo
    }
    return this.httpcliente.post(environment.hostname+":"+environment.puerto+'/addOferta', obj, this.HttpUploadOptions); 
  }

  public addOfertaSis(_idoferta:number, _idempresa:number):Observable<any>{
    let obj:any={
      _idoferta:_idoferta,
      _idempresa:_idempresa
    }
    return this.httpcliente.post(environment.hostname+":"+environment.puerto+'/addOfertaSis', obj, this.HttpUploadOptions); 
  }

  
  public eliminarOfertaEmpresa(_id:number){
    return this.httpcliente.delete(environment.hostname+":"+environment.puerto+'/eliminarOfertaEmpresa/'+_id);
  }

}
