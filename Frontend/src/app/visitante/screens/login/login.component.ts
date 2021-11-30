import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
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
  constructor(private fb:FormBuilder, private s_admin:AdminService, private s_empresa:EmpresaService, private router:Router, private s_login:LoginService, private s_estudiante:EstudianteService){ 
    this.formulario=this.fb.group({
      email:['',[Validators.email, Validators.required]],
      clave:['',[Validators.required]]
    });
  
  }

  ngOnInit(): void {
    
  }
  validar():void{

    
    let checkLogin:number=0;
    this.s_login.logearEstudiante(this.formulario.controls['email'].value,this.formulario.controls['clave'].value).subscribe(datos=>{
      if(datos.acceso==true){
        //guardamos contexto de idEstudiante
        this.s_estudiante.setLS_loginEstudiante(datos._id);
        //agregar estudiante y retornar id
        this.router.navigate(['/inicioEstudiante']);
      }else checkLogin++;
    });
    //logear empresa
    this.s_login.logearEmpresa(this.formulario.controls['email'].value,this.formulario.controls['clave'].value).subscribe(datos=>{
      console.log(datos);
      if(datos.acceso==true){
        //guardamos contexto de idEstudiante
        this.s_empresa.saveLS_empresa(datos._id);
        //agregar estudiante y retornar id
        this.router.navigate(['/empresa']);
      }else checkLogin++;
    });
    //logear admin
    this.s_login.loginAdmin(this.formulario.controls['email'].value,this.formulario.controls['clave'].value).subscribe(datos=>{
      if(datos.acceso==true){
        //guardamos contexto de idEstudiante
        this.s_admin.saveLS_admin(datos._id);
        //agregar estudiante y retornar id
        this.router.navigate(['/admin']);
        // console.log("OK");
      }else checkLogin++;
      if(checkLogin==3)alert('Datos incorrectos, usuario no registrado.');
    });
  }
  btn_registrar():void{
    this.register_event.emit("1");
    // console.log("emito 1");
  }
}
