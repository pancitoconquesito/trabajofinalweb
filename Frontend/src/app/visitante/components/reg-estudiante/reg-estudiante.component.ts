import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { listaCiudadChile, listaCiudadColombia } from 'src/app/FAKE_BD';
import { Ciudad } from 'src/app/models/ciudad.model';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-reg-estudiante',
  templateUrl: './reg-estudiante.component.html',
  styleUrls: ['./reg-estudiante.component.scss']
})
export class RegEstudianteComponent implements OnInit {

  formulario:FormGroup;
  //test:string='nada';

  listaCiudadChile_:Array<string>;
  listaCiudadColombia_:Array<string>;

  listaCiudadActual:Array<string>=[];
  constructor(private fb:FormBuilder, private router:Router, private s_login:LoginService, private s_estudiante:EstudianteService) {
    this.formulario=this.fb.group({
      nombres:['',[Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      apellidos:['',[Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      email:['',[Validators.email, Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      pais:['0',[]],
      contrasena:['',[Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      ciudad:['0',[]],
      cc_reg:['',[Validators.required]],
      telefono:['',[Validators.required, Validators.pattern("[0-9]{5,15}$")]]
    });
    this.listaCiudadChile_=listaCiudadChile.slice();
    this.listaCiudadColombia_=listaCiudadColombia.slice();
   }

  ngOnInit(): void {
    
  }

  validarFormulario(){

    if(this.formulario.controls['pais'].value!='0' && this.formulario.controls['ciudad'].value!='0'){
      this.validarRegistro();
    }else alert('completa los campos de pais y ciudad');
  }
  
  validarRegistro(){
    this.s_login.isEmailDisponible(this.formulario.controls['email'].value).subscribe(datos=>{
      if(datos.valor==true){
        // alert("ta bn");
        this.crearEstudiante();
      }else alert('correo ya registrado.');
    });
  }
  crearEstudiante(){
    this.s_login.addEstudiante(this.formulario.controls['nombres'].value,
    this.formulario.controls['apellidos'].value,
    this.formulario.controls['email'].value,
    this.formulario.controls['pais'].value,
    this.formulario.controls['contrasena'].value,
    this.formulario.controls['ciudad'].value,
    this.formulario.controls['cc_reg'].value,
    this.formulario.controls['telefono'].value).subscribe(datos=>{
      let idNewEstudiante:number=datos.valor;
      //guardamos contexto de idEstudiante
      this.s_estudiante.setLS_loginEstudiante(idNewEstudiante);
      //agregar estudiante y retornar id
      this.router.navigate(['/inicioEstudiante']);
    });

  }
  selectPais(){
    let valor:string=this.formulario.controls['pais'].value;
    if(valor==='null')  this.listaCiudadActual.splice(0,this.listaCiudadActual.length);
    if(valor==='Chile')  this.listaCiudadActual=this.listaCiudadChile_.slice();
    if(valor==='Colombia')  this.listaCiudadActual=this.listaCiudadColombia_.slice();
  }




}
