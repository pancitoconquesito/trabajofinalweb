import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { ModuloCurso } from 'src/app/models/modeloCurso.model';
import { CursoService } from 'src/app/services/curso/curso.service';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
@Component({
  selector: 'app-curso-actual-screen',
  templateUrl: './curso-actual-screen.component.html',
  styleUrls: ['./curso-actual-screen.component.scss']
})
export class CursoActualScreenComponent implements OnInit {

  aaa:string="https://www.youtube.com/embed/sxgIKQEZIQI";


  id_curso:number=99;
  cursoActual:Curso={_id:0,img:'', titulo:'',cant_modulos:0,duracion:0,tematica:'',descripcion_general:'',modulos:[]};
  moduloActual:ModuloCurso={_id:0, img:'', numero_modulo:0, titulo:'',descripcion:'',duracion:0,urlvideo:'',fk_curso:0};
  listaModulo:Array<ModuloCurso>=[];
  constructor(private ruta:ActivatedRoute, private s_curso:CursoService, private s_estudiante:EstudianteService, private nuevaRuta:Router){
    this.ruta.params.subscribe(datos =>{
      this.id_curso=datos["idCurso"];
    });
  }

  ngOnInit(): void {
    
    this.s_curso.getCurso(this.id_curso).subscribe(datosCurso=>{

      let cursoApi:Curso={
        _id:datosCurso._id,
        img:datosCurso.img,
        titulo:datosCurso.titulo,
        cant_modulos:datosCurso.cant_modulos,
        duracion:datosCurso.duracion,
        tematica:datosCurso.tematica,
        descripcion_general:datosCurso.descripcion_general,
        modulos:[]
      }
      this.cursoActual=cursoApi;
      this.s_curso.getModulos(this.id_curso).subscribe(datosModulo=>{
        // console.log(datosModulo);
        let listaModulosApi:Array<ModuloCurso>=[];
        for(let i=0;i<datosModulo.length;i++){
          let moduloActual:ModuloCurso={
            _id:0,
            img:datosModulo[i].img,
            numero_modulo:datosModulo[i].numero_modulo,
            titulo:datosModulo[i].titulo,
            descripcion:datosModulo[i].descripcion,
            duracion:datosModulo[i].duracion,
            urlvideo:datosModulo[i].urlvideo,
            fk_curso:0
          }
          listaModulosApi.push(moduloActual);
        }
        // console.log(listaModulosApi);
        this.cursoActual.modulos=listaModulosApi;
        this.listaModulo=listaModulosApi;
        
        // this.cursoActual=cursoApi;
      }); 
    }); 





  }


  eliminarCurso(){
    this.s_estudiante.eliminarCurso(Number(this.s_estudiante.getLS_loginEstudiante()) , this.id_curso).subscribe(datos=>{
      this.nuevaRuta.navigate(['/inicioEstudiante/cursos']);
    });
  }

  
  cambiarModulo(nModulo:number){
    this.moduloActual=this.listaModulo[nModulo-1];
  }
  getUrl(){
    //return this.sanitizer.bypassSecuritytrustResourceurl
    // return "https://www.youtube.com/embed/sxgIKQEZIQI";
  }
}
