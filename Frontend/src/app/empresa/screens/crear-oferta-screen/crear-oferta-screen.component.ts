import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { listaCiudadChile, listaCiudadColombia } from 'src/app/FAKE_BD';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'app-crear-oferta-screen',
  templateUrl: './crear-oferta-screen.component.html',
  styleUrls: ['./crear-oferta-screen.component.scss']
})
export class CrearOfertaScreenComponent implements OnInit {

  formulario:FormGroup;
  listaCiudadActual:Array<string>=[];
  listaCiudadChile_:Array<string>;
  listaCiudadColombia_:Array<string>;
  formularioCompleto:boolean=false;
  constructor(private fb:FormBuilder, private s_empresa:EmpresaService) {
    this.formulario=this.fb.group({
      titulo:['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      descripcion:['',[Validators.required,  Validators.minLength(10), Validators.maxLength(500)]],
      pais:[0,],
      ciudad:[0,],
      tipojornada:[0],
      email:['', [Validators.required, Validators.maxLength(30), Validators.email]],
      telefono:['',[Validators.required, Validators.pattern("[0-9]{5,15}$")]],
      teletrabajo:[0],
      sueldo:['',[Validators.required, Validators.pattern("[0-9]{1,15}$")]]
    });
    this.listaCiudadChile_=listaCiudadChile.slice();
    this.listaCiudadColombia_=listaCiudadColombia.slice();
   }


  ngOnInit(): void {
  }
  selectPais(){
    let valor:string=this.formulario.controls['pais'].value;
    if(valor==='null')  this.listaCiudadActual.splice(0,this.listaCiudadActual.length);
    if(valor==='Chile')  this.listaCiudadActual=this.listaCiudadChile_.slice();
    if(valor==='Colombia')  this.listaCiudadActual=this.listaCiudadColombia_.slice();
  }
  validar(){
    
    if( this.formulario.controls['pais'].value!='0' && this.formulario.controls['ciudad'].value!='0' && this.formulario.controls['tipojornada'].value!='0'){
      this.s_empresa.isEmpresaDisponible(this.formulario.controls['email'].value).subscribe(dato=>{
        if(dato.valor==true)
          this.addOferta(); 
        else alert("Correo ya registrado.");
      });
    }else alert("complete formulario");
    
  }
  addOferta(){
    //agregar y mostrar mensaje de agregado
    this.s_empresa.addOferta(this.formulario.controls['titulo'].value,
    this.formulario.controls['descripcion'].value,
    this.formulario.controls['pais'].value,
    this.formulario.controls['ciudad'].value,
    new Date(Date.now()).toUTCString(),
    this.formulario.controls['tipojornada'].value,
    this.formulario.controls['email'].value,
    this.formulario.controls['telefono'].value,
    Number(this.s_empresa.getLS_empresa()),
    this.formulario.controls['teletrabajo'].value,
    this.formulario.controls['sueldo'].value).subscribe(dato=>{
      //agregar a sis_listaoferta
      let _idNuevaOferta:number=dato._id;
      console.log(_idNuevaOferta);
      this.s_empresa.addOfertaSis(_idNuevaOferta, Number(this.s_empresa.getLS_empresa())).subscribe(dato=>{
        console.log(dato);
        this.formularioCompleto=true;
      });
    });
  }
}
