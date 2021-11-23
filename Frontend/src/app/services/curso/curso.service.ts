import { Injectable } from '@angular/core';
import { listaCursos, listaCursosID } from 'src/app/FAKE_BD';
import { Curso } from 'src/app/models/curso.model';
import { CursosID } from 'src/app/models/cursosID.models';


import{HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private httpcliente:HttpClient) { }
  private getAllListaIDCursos():Array<CursosID>{
    return listaCursosID;
  }

  public getAllCursos():Observable<any>{
    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getallcursos');
  }

  getModulos(idCurso:number):Observable<any>{
    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getmoduloscurso/'+idCurso);
  }

  getCurso(idCurso:number):Observable<any>{
    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getcurso/'+idCurso);
  }


}
