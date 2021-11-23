import { Injectable } from '@angular/core';
import { listaEstudiante, listaEmpresas_ } from 'src/app/FAKE_BD';
import { CursoInscrito, Estudiante } from 'src/app/models/estudiante.model';

import{HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private httpcliente:HttpClient) { }
	HttpUploadOptions = {
		headers: new HttpHeaders({ Accept: 'application/json' }),
	};
	public isEmailDisponible(email:string):Observable<any>{
		let retorno:any=this.httpcliente.get(environment.hostname+":"+environment.puerto+'/isemaildisponible/'+email);
		// console.log("servicio_"+retorno);
		return retorno;
	}

	public addEstudiante(nombres:string,apellidos:string,email:string,pais:string,contrasena:string,ciudad:string,cc_reg:string,telefono:number):Observable<any>{
		let datos={
			nombres:nombres, apellidos:apellidos, email:email, contrasena:contrasena, pais:pais, ciudad:ciudad, telefono:telefono, cc:cc_reg
		}
		let retorno:any=this.httpcliente.post(environment.hostname+":"+environment.puerto+'/addEstudiante',datos, this.HttpUploadOptions);
		return retorno;
	}
	// public addEstudiante(nombres:string,apellidos:string,email:string,pais:string,contrasena:string,ciudad:string,cc_reg:string,telefono:number):number{
	// 	let newId=listaEstudiante[listaEstudiante.length-1]._id+1;
	// 	let newCursosInscritos:Array<CursoInscrito>=[];
	// 	let newEstudiante:Estudiante={
	// 		_id:newId,
	// 		nombres:nombres,
	// 		apellidos:apellidos,
	// 		email:email,
	// 		pais:pais,
	// 		contrasena:contrasena,
	// 		ciudad:ciudad,
	// 		telefono:telefono,
	// 		cc:cc_reg,
	// 		cursosInscritos:newCursosInscritos
	// 	}
	// 	listaEstudiante.push(newEstudiante);
	// 	console.log(ciudad);
	// 	return newId;
	// }









	public checkLoginEstudiante(email:string, clave :string):boolean{
		let respuesta:boolean=false;
		listaEstudiante.forEach((valor)=>{
			if(valor.email===email){
				if(valor.contrasena===clave){
					respuesta= true;
				} 
			}
		});
		return respuesta;
	}
	public getIdEstudiante(email:string):number{
		let idRetorno:number=0;
		listaEstudiante.forEach((valor)=>{
			if(valor.email===email)	idRetorno=valor._id;
		});
		return idRetorno;
	}

	
}
