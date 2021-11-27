import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { Estudiante } from 'src/app/models/estudiante.model';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';

@Component({
  selector: 'app-inicio-screens',
  templateUrl: './inicio-screens.component.html',
  styleUrls: ['./inicio-screens.component.scss']
})
export class InicioScreensComponent implements OnInit {

  estudiante:Estudiante={_id:0,nombres:'',apellidos:'',email:'',contrasena:'',pais:'',ciudad:'',telefono:0,cc:'',cursosInscritos:[]};
  nombreEstudante:string='';
  listacursosestudiante:Array<Curso>=[];
  sinCursos:boolean=true;
  constructor( private s_estudiante:EstudianteService) { }

  ngOnInit(): void {
    let idEstudiante:number=Number(this.s_estudiante.getLS_loginEstudiante());
    this.s_estudiante.getInfoEstudiante(idEstudiante).subscribe(datos=>{
      this.nombreEstudante=datos.nombres+" "+datos.apellidos;
      this.estudiante=datos;
      // console.log(this.estudiante);
    });
    // console.log("id estudiante : "+idEstudiante);

    
    this.s_estudiante.getCursosEstudiante(idEstudiante).subscribe(datos=>{
      this.sinCursos=datos.length < 1;
      this.listacursosestudiante=datos;
    });




  }

}
