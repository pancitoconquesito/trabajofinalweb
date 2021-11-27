import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-crear-curso-screen',
  templateUrl: './crear-curso-screen.component.html',
  styleUrls: ['./crear-curso-screen.component.scss']
})
export class CrearCursoScreenComponent implements OnInit {

  formulario:FormGroup;
  formularioCompleto:boolean=false;
  constructor(private fb:FormBuilder, private router:Router, private s_admin:AdminService) {
    this.formulario=this.fb.group({
      img:['',[Validators.required, Validators.maxLength(500)]],
      titulo:['',[Validators.required, Validators.minLength(2),Validators.maxLength(100)]],
      // cant_modulo:['',[Validators.required]],
      // duracion:['',[Validators.required]],
      tematica:['0',[Validators.required]],
      descripcion_general:['',[Validators.required,Validators.minLength(10),Validators.maxLength(500)]]
    });
   }

  ngOnInit(): void {
  }

  idCurso:number=99;
  validar(){

    this.s_admin.addCurso(this.formulario.controls['img'].value,this.formulario.controls['titulo'].value,0,0,this.formulario.controls['tematica'].value,this.formulario.controls['descripcion_general'].value).subscribe(dato=>{
      console.log(dato);
      this.idCurso=dato._id;
      this.formularioCompleto=true;
    });
  }
  irACurso(){
    this.router.navigate(['admin/curso-actual/'+this.idCurso]);
  }
}
