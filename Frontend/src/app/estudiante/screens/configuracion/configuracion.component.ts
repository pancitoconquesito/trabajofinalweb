import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from 'src/app/models/estudiante.model';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  formularioCompletado:boolean=false;
  estudianteActual:Estudiante={_id:0,nombres:'',apellidos:'',email:'',contrasena:'',pais:'',ciudad:'',telefono:0,cc:'',cursosInscritos:[]};
  formulario!: FormGroup;
  constructor(private fb:FormBuilder, private s_estudiante:EstudianteService,) { 
    let idEstudiantePiv=this.s_estudiante.getLS_loginEstudiante();
    let idEstudiante=Number(idEstudiantePiv);

    this.s_estudiante.getInfoEstudiante(idEstudiante).subscribe(datos=>{
      this.estudianteActual=datos;
      this.formulario=this.fb.group({
        nombres:[this.estudianteActual.nombres,[Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
        apellidos:[this.estudianteActual.apellidos,[Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
        email:[this.estudianteActual.email,[Validators.email, Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
        //pais:['0',[]],
        contrasena:[this.estudianteActual.contrasena,[Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
        //ciudad:['0',[]]
    
        cc:[this.estudianteActual.cc,[Validators.required]],
        telefono:[this.estudianteActual.telefono,[Validators.required, Validators.pattern("[0-9]{5,15}$")]]
      });
    });
    
  }
  
  ngOnInit(): void {
    // console.log(this.estudianteActual);
    // console.log(JSON.stringify(this.estudianteActual));
  }

  editar(){
    // this.s_estudiante.UpdateEstudiante( 
    //   this.estudianteActual._id,
    //   this.formulario?.controls['nombres'].value,
    //   this.formulario?.controls['apellidos'].value,
    //   this.formulario?.controls['contrasena'].value,
    //   this.formulario?.controls['cc'].value,
    //   this.formulario?.controls['telefono'].value);
    // this.formularioCompletado=true;
    this.s_estudiante.UpdateEstudiante( 
      this.estudianteActual._id,
      this.formulario?.controls['nombres'].value,
      this.formulario?.controls['apellidos'].value,
      this.formulario?.controls['contrasena'].value,
      this.formulario?.controls['cc'].value,
      this.formulario?.controls['telefono'].value);
    this.formularioCompletado=true;
  }
}
