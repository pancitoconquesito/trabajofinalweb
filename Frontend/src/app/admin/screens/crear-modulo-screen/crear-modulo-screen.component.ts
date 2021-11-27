import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { ModuloCurso } from 'src/app/models/modeloCurso.model';
import { AdminService } from 'src/app/services/admin/admin.service';
@Component({
  selector: 'app-crear-modulo-screen',
  templateUrl: './crear-modulo-screen.component.html',
  styleUrls: ['./crear-modulo-screen.component.scss']
})
export class CrearModuloScreenComponent implements OnInit {

  formulario:FormGroup;
  idCurso:number=0;
  cursoActual:Curso={
    _id:0,
    img:'',
    titulo:'',
    cant_modulos:0,
    duracion:0,
    tematica:'',
    descripcion_general:'',
    modulos:[]
  }
  listaModulos:Array<ModuloCurso>=[];
  sinModulos:boolean=false;
  formularioCompleto:boolean=false;
  load:boolean=false;
  constructor(private rutaActiva: ActivatedRoute, private s_admin:AdminService, private fb:FormBuilder) {
    this.rutaActiva.params.subscribe(param=>{
      this.idCurso=param['idCurso'];
      //this.cursoActual=
    });
    this.formulario=this.fb.group({
      img:['',[Validators.required, Validators.maxLength(500)]],
      titulo:['',[Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      descripcion:['',[Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      duracion:['',[Validators.required, Validators.pattern("[0-9]{1,15}$")]],
      urlvideo:['',[Validators.required, Validators.maxLength(200)]]
    });
   }

  ngOnInit(): void {
    this.cargarCurso();
  }


  validar(){
    let nuevoModulo:ModuloCurso={
      _id:0,
      img:this.formulario.controls['img'].value,
      numero_modulo:this.listaModulos.length+1,
      titulo:this.formulario.controls['titulo'].value,
      descripcion:this.formulario.controls['descripcion'].value,
      duracion:this.formulario.controls['duracion'].value,
      urlvideo:this.formulario.controls['urlvideo'].value,
      fk_curso:this.idCurso
    }
    this.formularioCompleto=true;
    //subir modulo
    let new_cantModulosCurso=Number(this.cursoActual.cant_modulos+1);

    let new_duracionCurso:number=0;
    for(let i =0;i<this.listaModulos.length;i++){
      new_duracionCurso=Number(Number(this.listaModulos[i].duracion)+new_duracionCurso);
    }
    new_duracionCurso=Number(Number(this.formulario.controls['duracion'].value)+new_duracionCurso);

    this.s_admin.addModulo(nuevoModulo).subscribe(dato=>{
      console.log("add modulo");
      console.log(dato);
      this.actualizarCurso(new_cantModulosCurso, new_duracionCurso);

    });
    this.load=true;
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(this.cargarCurso());
      }, 1500);
    }).then(()=> this.cargarCurso());
  }



  otroModulo(){
    this.formulario.reset();
    this.formularioCompleto=false;
  }
  cargarCurso(){
    this.s_admin.getCurso(this.idCurso).subscribe(dato=>{
      console.log("carga curso");
      this.cursoActual=dato;
      this.cargarListaModulos();
    });
  }

  cargarListaModulos(){
    this.s_admin.getModulos(this.idCurso).subscribe(datos=>{
      console.log(datos.length);
      this.listaModulos=datos;
      if(this.listaModulos.length==0) this.sinModulos=true; else this.sinModulos=false;
    });
    this.load=false;
  }
  actualizarCurso(new_cantModulosCurso:number, new_duracionCurso:number){
    this.s_admin.updateCurso(this.idCurso, new_cantModulosCurso, new_duracionCurso).subscribe(dato=>{
      console.log("actualizar");
      console.log(dato);
      this.cargarCurso();
    });
  }
}
