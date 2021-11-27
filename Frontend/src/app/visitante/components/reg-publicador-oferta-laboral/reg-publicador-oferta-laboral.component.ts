import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { ImgService } from 'src/app/services/img/img.service';
@Component({
  selector: 'app-reg-publicador-oferta-laboral',
  templateUrl: './reg-publicador-oferta-laboral.component.html',
  styleUrls: ['./reg-publicador-oferta-laboral.component.scss']
})
export class RegPublicadorOfertaLaboralComponent implements OnInit {

  formulario:FormGroup;
  constructor(private fb:FormBuilder,private s_empresa:EmpresaService , private router:Router, private s_img:ImgService, private sanitizer:DomSanitizer){ 
    this.formulario=this.fb.group({
      nombreEmpresa:['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      correo:['',[Validators.email, Validators.required, Validators.maxLength(50)]],
      password:['',[Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      telefono:['',[Validators.required, Validators.pattern("[0-9]{5,15}$")]],
      imgEmpresa:['',[Validators.required, Validators.maxLength(500)]]
    });
  
  }

  ngOnInit(): void {
  }

  validar():void{
    let descripcionEmpresa:any=document.getElementById("descripcionEmpresa");
    if(descripcionEmpresa.value.length <5 || descripcionEmpresa.value.length>500){
      alert("descripción debe contener entre 5 - 500 caracteres");
    }else{
      this.s_empresa.isEmpresaDisponible(this.formulario.controls['correo'].value).subscribe(dato=>{
        if(dato.valor==true){
          this.s_empresa.addEmpresa(
            this.formulario.controls['nombreEmpresa'].value,
            this.formulario.controls['correo'].value,
            this.formulario.controls['password'].value,
            this.formulario.controls['telefono'].value,
            descripcionEmpresa.value,
            this.formulario.controls['imgEmpresa'].value
          ).subscribe(dato=>{
            let idEmpresa=dato._id;
            //guardar contexto de empresa
            this.s_empresa.saveLS_empresa(idEmpresa);
            //rediriguir al menu principal
            this.router.navigate(['/empresa']);
          });
        }else{
          alert("Correo ya registrado, vuelva a intentarlo");
        }
      });
    }
  }

  // public archivos:any=[];
  // public preview:string='';
  // capturarArchivo(event:any):any{
  //   const imgCaptarada=event.target.files[0];
  //   this.extraerbase64(imgCaptarada).then((imagen:any)=>{
  //     this.preview=imagen.base;
  //   });
  //   this.archivos.push(imgCaptarada );
  // }
  // extraerbase64 = async ($event: any) => new Promise((resolve, reject) => {
  //   try {
  //     const unsafeImg = window.URL.createObjectURL($event);
  //     const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
  //     const reader = new FileReader();
  //     reader.readAsDataURL($event);
  //     reader.onload = () => {
  //       resolve({
  //         // blob: $event,
  //         // image,
  //         base: reader.result
  //       });
  //     };
  //     reader.onerror = error => {
  //       resolve({
  //         // blob: $event,
  //         // image,
  //         base: null
  //       });
  //     };

  //   } catch (e) {
  //     return null;
  //   }
  //   return null;
  // });

  // loadImages = () => {
  //   try {
  //     const formData = new FormData();
  //     this.archivos.forEach((archivo:any) => {
  //       formData.append('files', archivo)
  //     });
  //     // this.loading = true;
  //     this.rest.post(`http://localhost:3001/upload_imagen`, formData)
  //       .subscribe(res => {
  //         // this.loading = false;
  //         console.log('Carga exitosa');


  //       });
  //   } catch (e) {
  //     console.log('ERROR', e);

  //   }
  // }
}