import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
// import { listaCursos, listaEstudiante } from 'src/app/FAKE_BD';
import { Curso } from 'src/app/models/curso.model';
import { CursoInscrito, Estudiante } from 'src/app/models/estudiante.model';

import{HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  constructor(private httpcliente:HttpClient) { }
  HttpUploadOptions = {
		headers: new HttpHeaders({ Accept: 'application/json' }),
	};
  iscursoXestudiante(idEstudiante:number, idCurso:number):Observable<any>{
    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/iscursoXestudiante/'+idEstudiante+'/'+idCurso);
  }

  public isLoginEstudiante():Observable<any>{
    let retorno:any={valor:false};
    let idEstudianteS=localStorage.getItem('idEstudiante');
    if(idEstudianteS!=null){
      let idEstudiante=Number(idEstudianteS);
      idEstudiante=Number(idEstudiante);

      retorno=this.httpcliente.get(environment.hostname+":"+environment.puerto+'/isestudiante/'+idEstudiante);
    }
    console.log("servidor login _ :"+retorno.valor);
    return retorno;
  }

  public setLS_loginEstudiante(idLS:number){
    console.log("guardar como ..."+String(idLS));
		localStorage.setItem("idEstudiante", String(idLS));
	}

	public getLS_loginEstudiante(){
		return localStorage.getItem('idEstudiante');
	}

  public getCursosEstudiante(_id:number):Observable<any>{
		return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/listacursosestudiante/'+_id);
	}

  public addCursoXEstudiante(idEstudiante:number, idCurso:number):Observable<any>{
		let datos={
			idEstudiante:idEstudiante, idCurso:idCurso
		}
		return this.httpcliente.post(environment.hostname+":"+environment.puerto+'/addcursoxestudiante',datos, this.HttpUploadOptions);
	}

  public getInfoEstudiante(idEstudiante:number):Observable<any>{
    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getinfoestudiante/'+idEstudiante);
  }
 
  public getPais(_id:number):Observable<any>{
    return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getpaisestudiante/'+_id);
  }





  public UpdateEstudiante(_id:number, nombres:string, apellidos:string, contrasena:string, cc_reg:string, telefono:number):Observable<any>{
    let datos={
			nombres : nombres,
      apellidos: apellidos,
      contrasena: contrasena,
      cc : cc_reg,
      telefono: telefono
		}
    return this.httpcliente.put(environment.hostname+":"+environment.puerto+'/actualizardataestudiante/'+_id, datos);
  }
  public eliminarCurso(_idEstudainte:number, _idcurso:number){
    return this.httpcliente.delete(environment.hostname+":"+environment.puerto+'/eliminarcursoestudiante/'+_idEstudainte+'/'+ _idcurso);
  }


}
