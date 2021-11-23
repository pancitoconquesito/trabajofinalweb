import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { ModuloCurso } from 'src/app/models/modeloCurso.model';
import { CursoService } from 'src/app/services/curso/curso.service';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';

@Component({
  selector: 'app-curso-descripcion-screen',
  templateUrl: './curso-descripcion-screen.component.html',
  styleUrls: ['./curso-descripcion-screen.component.scss']
})
export class CursoDescripcionScreenComponent implements OnInit {

  idCurso:number=-1;
  listaModulos:Array<ModuloCurso>=[];
  cursoActual:Curso={id:0,img:'',titulo:'',cantModulos:0,duracion:0,tematica:'',descripcionGeneral:'',modulos:[]};
  constructor(private rutaSig:Router, private route:ActivatedRoute, private servicioCurso:CursoService, private s_estudiante:EstudianteService) {
    this.route.params.subscribe(param=>{
      this.idCurso=param['idCurso'];
    });

    this.servicioCurso.getCurso(this.idCurso).subscribe(datosCurso=>{

      let cursoApi:Curso={
        id:datosCurso._id,
        img:datosCurso.img,
        titulo:datosCurso.titulo,
        cantModulos:datosCurso.cant_modulos,
        duracion:datosCurso.duracion,
        tematica:datosCurso.tematica,
        descripcionGeneral:datosCurso.descripcion_general,
        modulos:[]
      }
      this.cursoActual=cursoApi;
      this.servicioCurso.getModulos(this.idCurso).subscribe(datosModulo=>{
        console.log(datosModulo);
        let listaModulosApi:Array<ModuloCurso>=[];
        for(let i=0;i<datosModulo.length;i++){
          let moduloActual:ModuloCurso={
            img:datosModulo[i].img,
            numeroModulo:datosModulo[i].numero_modulo,
            titulo:datosModulo[i].titulo,
            descripcion:datosModulo[i].descripcion,
            duracion:datosModulo[i].duracion,
            urlVideo:datosModulo[i].urlvideo
          }
          listaModulosApi.push(moduloActual);
        }
        console.log(listaModulosApi);
        this.cursoActual.modulos=listaModulosApi;
        this.listaModulos=listaModulosApi;
        
        // this.cursoActual=cursoApi;
      }); 
    }); 
  }

  ngOnInit(): void {

    // 
    
  }
  

  
  addCurso(){
    if(this.s_estudiante.isLoginEstudiante()){
      let pivoteIdEstudiante:any=this.s_estudiante.getLS_loginEstudiante();
      let idEstudiante=Number(pivoteIdEstudiante);
      if(idEstudiante!=undefined || idEstudiante!=null){

        this.s_estudiante.addCursoXEstudiante(idEstudiante, this.cursoActual.id).subscribe(datos=>{
          //redirigo a ruta para ver el curso full
          this.rutaSig.navigate(['/inicioEstudiante/cursos/'+this.cursoActual.titulo+'/'+this.cursoActual.id]);
        });
      }
    }//else login
  }

}
