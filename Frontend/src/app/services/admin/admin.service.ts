import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuloCurso } from 'src/app/models/modeloCurso.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

	constructor(private httpcliente:HttpClient) { }
  	HttpUploadOptions = {
		headers: new HttpHeaders({ Accept: 'application/json' }),
	};
  public saveLS_admin(idLS:number){
    // console.log("guardar como ..."+String(idLS));
		localStorage.setItem("idAdmin", String(idLS));
	}

	public getLS_admin(){
		return localStorage.getItem('idAdmin');
	}
	public addCurso( img:string, titulo:string, cant_modulo:number, duracion:number, tematica:string, descripcion_general:string):Observable<any>{
		let datos:any={
			img:img, titulo:titulo, cant_modulo:cant_modulo, duracion:duracion, tematica:tematica, descripcion_general:descripcion_general
		}
		return this.httpcliente.post(environment.hostname+":"+environment.puerto+'/addCurso', datos, this.HttpUploadOptions);  
	}
	public getCurso(idCurso:number):Observable<any>{
		return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getcurso/'+idCurso); 
	};
	public getModulos(idCurso:number):Observable<any>{
		return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getmoduloscurso/'+idCurso); 
	};
	
	public addModulo( modulo:ModuloCurso):Observable<any>{
		return this.httpcliente.post(environment.hostname+":"+environment.puerto+'/addModulo', modulo, this.HttpUploadOptions);  
	}
	public updateCurso(idCurso:number, new_cantModulosCurso:number, new_duracionCurso:number):Observable<any>{
		let datos={
			new_cantModulosCurso: new_cantModulosCurso,
			new_duracionCurso: new_duracionCurso
		}
		return this.httpcliente.put(environment.hostname+":"+environment.puerto+'/actualizarCurso/'+idCurso, datos);
	}
	public getallcursos():Observable<any>{
		return this.httpcliente.get(environment.hostname+":"+environment.puerto+'/getallcursos'); 
	}
	
}
