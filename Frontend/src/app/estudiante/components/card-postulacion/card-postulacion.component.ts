import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfertaLaboral } from 'src/app/models/oferta_laboral.model';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'app-card-postulacion',
  templateUrl: './card-postulacion.component.html',
  styleUrls: ['./card-postulacion.component.scss']
})
export class CardPostulacionComponent implements OnInit {

  @Input() oferta:OfertaLaboral={_id:0,titulo:'',descripcion:'',pais:'',ciudad:'',fecha_publicacion:'',tipo_jornada:'',correo_contacto_reclutar:'',telefono_contacto_laboral:0,fk_idEmpresa:0,teletrabajo:false,salario:0};
  imagenEmpresa:string='';
  nombreEmpresa:string='';
  numeroNub:number=0;
  constructor(private empresaS:EmpresaService, private routerRouter:Router) { }

  ngOnInit(): void {
    console.log(this.oferta.fk_idEmpresa);
    this.empresaS.getImagenEmpresa(this.oferta.fk_idEmpresa).subscribe(dato=>{
      // console.log(dato);
      this.imagenEmpresa=dato.valor;
    });
    this.empresaS.getEmpresa(this.oferta.fk_idEmpresa).subscribe(dato=>{
      // console.log(dato.valor.nombre_empresa);
      this.nombreEmpresa=dato.valor.nombre_empresa;
    });

    console.log(this.oferta._id);
    this.empresaS.getNubEmpresaOferta(this.oferta._id, this.oferta.fk_idEmpresa).subscribe(dato=>{
      // console.log(dato.valor.nombre_empresa);
      this.numeroNub=dato.valor;
    });
    
    

  }

  verOferta(){
    this.routerRouter.navigate(['/inicioEstudiante/ofertas/'+this.nombreEmpresa+'/'+ this.numeroNub]);
  }

}
