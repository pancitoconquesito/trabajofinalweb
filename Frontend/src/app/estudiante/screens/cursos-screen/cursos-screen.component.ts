import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { FiltroCurso } from 'src/app/models/filtroCurso.model';
import { CursoService } from 'src/app/services/curso/curso.service';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
@Component({
  selector: 'app-cursos-screen',
  templateUrl: './cursos-screen.component.html',
  styleUrls: ['./cursos-screen.component.scss']
})
export class CursosScreenComponent implements OnInit {

  lista_cursos:Array<Curso>=[];
  filtro_cantModulos:number=0;
  filtro:FiltroCurso;

  textFiltro:string='...';
  temaProg:any;temaDiseno:any;temaHumanidades:any;
  mod1:any;mod2:any;mod3:any;mod4:any;modMas:any;
  constructor(private s_curso:CursoService, private rutaparam:ActivatedRoute, private s_estudiante:EstudianteService) {
    this.filtro={
      duracion1:false,
      duracion2:false,
      duracion3:false,
      duracion4:false,
      duracionMas:false,
      temaProg:false,
      temaDiseno:false,
      temaHumanidades:false
      }
   }

  ngOnInit(): void {
    
    let listaCursosReq:Array<Curso>=[];
    this.s_curso.getAllCursos().subscribe(datos=>{
      for(let i =0;i<datos.length;i++){
        let cursoActual:Curso={
          id:datos[i]._id,
          img:datos[i].img,
          titulo:datos[i].titulo,
          cantModulos:datos[i].cant_modulos,
          duracion:datos[i].duracion,
          tematica:datos[i].tematica,
          descripcionGeneral:datos[i],
          modulos:[]
        };
        this.s_curso.getModulos(cursoActual.id).subscribe(datos=>{cursoActual.modulos=datos});
        listaCursosReq.push(cursoActual);
      }
      this.lista_cursos=listaCursosReq;
    });

    this.mod1=document.getElementById("uno_modulo");
    this.mod2=document.getElementById("dos_modulos");
    this.mod3=document.getElementById("tres_modulos");
    this.mod4=document.getElementById("cuatro_modulos");
    this.modMas=document.getElementById("mas_modulos");
    this.temaProg=document.getElementById("programacion");
    this.temaDiseno=document.getElementById("diseno");
    this.temaHumanidades=document.getElementById("humanidades");
  }
  updatefiltroTema(){
    this.filtro.temaProg=this.temaProg.checked;
    this.filtro.temaDiseno=this.temaDiseno.checked;
    this.filtro.temaHumanidades=this.temaHumanidades.checked;
  }
  changeDuracionModulo(){
    this.filtro.duracion1=this.mod1.checked;
    this.filtro.duracion2=this.mod2.checked;
    this.filtro.duracion3=this.mod3.checked;
    this.filtro.duracion4=this.mod4.checked;
    this.filtro.duracionMas=this.modMas.checked;
  }
}


