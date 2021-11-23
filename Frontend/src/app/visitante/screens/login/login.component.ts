import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() register_event=new EventEmitter();

  formulario:FormGroup;
  constructor(private fb:FormBuilder, private router:Router, private s_login:LoginService, private s_estudiante:EstudianteService){ 
    this.formulario=this.fb.group({
      email:['',[Validators.email, Validators.required]],
      clave:['',[Validators.required]]
    });
  
  }

  ngOnInit(): void {
  }
  validar():void{
    //si es estudiante
    
    
    if(this.s_login.checkLoginEstudiante(this.formulario.controls['email'].value,this.formulario.controls['clave'].value)){
      //guardamos contexto de idEstudiante
      this.s_estudiante.setLS_loginEstudiante(this.s_login.getIdEstudiante(this.formulario.controls['email'].value));
      //agregar estudiante y retornar id
      this.router.navigate(['/inicioEstudiante']);
    }else{
      alert("Correo o contraseña incorrecta");
    }
    //si es publicador
  }
  btn_registrar():void{
    this.register_event.emit("1");
    console.log("emito 1");
  }
}
